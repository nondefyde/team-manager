import AppProcessor from '../_core/app.processor';
import {isEmpty, omit, pick} from 'lodash';
import moment from 'moment';
import {Types} from 'mongoose';
import Employee from '../member/profiles/employee.model';
import Contractor from '../member/profiles/contractor.model';

/**
 * The ModuleProcessor class
 */
class MemberProcessor extends AppProcessor {
	/**
	 * An override for creating a member object
	 * @param {Object} obj The payload object
	 * @return {Object}
	 */
	async createNewObject(obj) {
		let session;
		try {
			session = await this.model.startSession();
			await session.startTransaction();
			let payload = {...obj};
			const fillables = this.model.fillables;
			if (fillables && fillables.length > 0) {
				payload = pick(obj, ...fillables);
			}
			// filter the request body for the required payload for the profile
			const ProfileModel = this.getProfile(obj.profileType);
			let profilePayload = {...obj.profile};
			const profileFillables = ProfileModel.fillables;
			if (profileFillables && profileFillables.length > 0) {
				profilePayload = pick(profilePayload, ...profileFillables);
			}

			let member = new this.model(payload);
			const profile = await ProfileModel.findOneAndUpdate({member: member._id},
				{
					...profilePayload,
					$setOnInsert: {
						member: member._id
					}
				}, {upsert: true, new: true, setDefaultsOnInsert: true, session});
			member.profile = profile._id;
			member = await member.save(session);
			await session.commitTransaction();
			return member;
		} catch (e) {
			if (session) {
				await session.abortTransaction();
			}
			throw e;
		}
	}

	/**
	 * An override for update / patching member object given its ID
	 * @param {Object} current The payload object
	 * @param {Object} obj The payload object
	 * @return {Object}
	 */
	async updateObject(current, obj) {
		try {
			const ProfileModel = this.getProfile(current.profileType);
			let profilePayload = {...obj.profile};
			const profileFillables = ProfileModel.fillables;
			if (profileFillables && profileFillables.length > 0) {
				profilePayload = pick(profilePayload, ...profileFillables);
			}
			let payload = {...obj};
			const fillables = this.model.updateFillables;
			if (fillables && fillables.length > 0) {
				payload = pick(obj, ...fillables);
			}
			if (!isEmpty(profilePayload)) {
				await ProfileModel.findOneAndUpdate({member: current._id},
					{
						...profilePayload,
						$setOnInsert: {
							member: current._id
						}
					}, {upsert: true, new: true, setDefaultsOnInsert: true});
			}
			current = Object.assign(current, payload);
			return current.save();
		} catch (e) {
			throw e;
		}
	}

	/**
	 * @param {Object} profileType The type of member
	 * @return {Object}
	 */
	getProfile(profileType) {
		return (profileType === 'Contractor') ? Contractor : Employee;
	}

	/**
	 * @param {Object} queryParser
	 * @return {Object}
	 */
	async memberFilterQuery(queryParser = null) {
		const omitKeys = [];
		let obj = queryParser.query;
		let query = [];
		/**
		 * this conditions handles the search query string value from ?search=q where q is the queryParser.search
		 * and the searchQuery function returns the field to be filtered upon as defined in the model
		 */
		if (queryParser.search && this.model.searchQuery(queryParser.search).length > 0) {
			const searchQuery = this.model.searchQuery(queryParser.search);
			query = query.concat(this.populateForSearch());
			query.push(
				{
					$match: {
						$or: [...searchQuery]
					}
				},
				{$project: {employeeObject: 0, contractorObject: 0}}
			);
		}
		// filter from start day to end day from createAt.
		if (obj.createdAt) {
			let startOfDay = moment(obj.createdAt).startOf('day');
			let endOfDay = moment(obj.createdAt).endOf('day');
			queryParser.query['createdAt'] = {
				$gte: new Date(startOfDay.toISOString()),
				$lte: new Date(endOfDay.toISOString())
			};
		}
		if (!isEmpty(obj)) {
			const booleanFields = ['deleted'];
			for (const key of booleanFields) {
				if (queryParser.query[key]) {
					queryParser.query[key] = queryParser.query[key] === 'true';
				}
			}
			/**
			 * This loop will iterate through the querystring object
			 * and filter keys that have the profile. contained within it
			 */
			const profileFilters = {};
			for (const key in obj) {
				if (obj.hasOwnProperty(key) && key.includes('profile.')) {
					const profileKey = key.split('.')[1];
					profileFilters[profileKey] = obj[key];
					delete obj[key];
				}
			}
			// filter can be done on member profile object id,
			// so this convert the string id to mongoose object id for pipeline filtering
			if (obj.profile) {
				queryParser.query['profile'] = Types.ObjectId(obj['profile']);
			}
			if (obj.tags) {
				queryParser.query['tags'] = {$in: obj.tags.split(',')};
			}
			// if profileFilters is not empty it means filtering has to be done on member type
			if (!isEmpty(profileFilters)) {
				query = query.concat(this.populateForSearch());
				const employeeConditions = {};
				const contractorConditions = {};
				for (const key in profileFilters) {
					if (profileFilters.hasOwnProperty(key)) {
						if (key === 'startDate' || key === 'endDate') {
							let startOfDay = moment(profileFilters[key]).startOf('day');
							let endOfDay = moment(profileFilters[key]).endOf('day');
							contractorConditions[`contractor.${key}`] = {
								$gte: new Date(startOfDay.toISOString()),
								$lte: new Date(endOfDay.toISOString())
							};
						} else {
							employeeConditions[`employee.${key}`] = profileFilters[key];
							contractorConditions[`contractor.${key}`] = profileFilters[key];
						}
					}
				}
				// Avoid sending an empty object to the conditional statement
				const condition = [];
				if (!isEmpty(employeeConditions)) {
					condition.push(employeeConditions);
				}

				if (!isEmpty(contractorConditions)) {
					condition.push(contractorConditions);
				}
				query.push(
					{
						$match: {
							$or: condition
						}
					},
					{$project: {employee: 0, contractor: 0}}
				);
			}
			queryParser.query = omit(queryParser.query, ...omitKeys);
			console.log('queryParser.query ::::: ', queryParser.query);
			query.push({
				$match: {
					...queryParser.query
				}
			});
		}
		return query;
	}

	/**
	 * For members population
	 * @return {[]}
	 */
	populateForSearch() {
		const query = [];
		query.push(
			{
				$lookup: {
					from: 'employees',
					localField: '_id',
					foreignField: 'member',
					as: 'employee'
				}
			},
			{
				$unwind: {
					path: '$employee',
					preserveNullAndEmptyArrays: true
				}
			}
		);
		query.push(
			{
				$lookup: {
					from: 'contractors',
					localField: '_id',
					foreignField: 'member',
					as: 'contractor'
				}
			},
			{
				$unwind: {
					path: '$contractor',
					preserveNullAndEmptyArrays: true
				}
			}
		);
		return query;
	}

	/**
	 * @param {Object} pagination The pagination object
	 * @param {Object} queryParser The query parser
	 * @return {Object}
	 */
	async buildModelQueryObject(pagination, queryParser = null) {
		const query = await this.memberFilterQuery(queryParser);
		return this.buildModelAggregateQueryObject(pagination, query, queryParser);
	}
}

export default MemberProcessor;
