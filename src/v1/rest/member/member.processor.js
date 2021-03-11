import AppProcessor from '../_core/app.processor';
import {isEmpty, pick} from 'lodash';
import Employee from '../member/profiles/employee.model';
import Contractor from '../member/profiles/contractor.model';

/**
 * The ModuleProcessor class
 */
class MemberProcessor extends AppProcessor {
	/**
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
			let member = new this.model(payload);
			const ProfileModel = this.getProfile(obj.profileType);
			let profilePayload = {...obj.profile};
			const profileFillables = ProfileModel.fillables;
			if (profileFillables && profileFillables.length > 0) {
				profilePayload = pick(profilePayload, ...profileFillables);
			}
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
}

export default MemberProcessor;
