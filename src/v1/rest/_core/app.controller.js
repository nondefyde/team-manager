import QueryParser from '../../../lib/query-parser';
import AppError from '../../../lib/app-error';
import {BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK} from '../../../utils/constants';
import lang from '../../../lang/index';
import {extend, isEmpty} from 'lodash';
import Pagination from '../../../lib/pagination';

/**
 * The App controller class
 */
class AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller
	 */
	constructor(model) {
		if (new.target === AppController) {
			throw new TypeError('Cannot construct Abstract instances directly');
		}
		if (model) {
			this.model = model;
			this.lang = lang.get(model.collection.collectionName);
		}
		this.id = this.id.bind(this);
		this.create = this.create.bind(this);
		this.findOne = this.findOne.bind(this);
		this.find = this.find.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}


	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @param {String} id The id from the url parameter
	 * @return {Object} res The response object
	 */
	async id(req, res, next, id) {
		let request = this.model.findOne({_id: id, deleted: false});
		try {
			let object = await request;
			if (object) {
				req.object = object;
				return next();
			}
			const appError = new AppError(this.lang.not_found, NOT_FOUND);
			return next(appError);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} The response object
	 */
	async findOne(req, res, next) {
		let object = req.object;
		req.response = {
			model: this.model,
			code: OK,
			value: object
		};
		return next();
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async create(req, res, next) {
		try {
			const processor = this.model.getProcessor(this.model);
			const validate = await this.model.getValidator().create(req.body);
			if (!validate.passed) {
				return next(new AppError(lang.get('error').inputs, BAD_REQUEST, validate.errors));
			}
			const obj = await req.body;
			let uniqueValidationError = await processor.validateUnique(this.model, obj);
			if (uniqueValidationError) {
				return next(uniqueValidationError);
			}
			let checkError = await processor.validateCreate(obj);
			if (checkError) {
				return next(checkError);
			}
			const object = await processor.createNewObject(obj);
			req.response = {
				message: this.lang.created,
				model: this.model,
				code: CREATED,
				value: await object
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} The response object
	 */
	async find(req, res, next) {
		const pagination = new Pagination(req.originalUrl);
		const queryParser = new QueryParser(Object.assign({}, req.query));
		const processor = this.model.getProcessor(this.model);
		try {
			const {value, count} = await processor.buildModelQueryObject(pagination, queryParser);
			req.response = {
				model: this.model,
				code: OK,
				value,
				count,
				queryParser,
				pagination
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async update(req, res, next) {
		try {
			const processor = this.model.getProcessor(this.model);
			const obj = req.body;
			const validate = await this.model.getValidator().update(obj);
			if (!validate.passed) {
				const error = new AppError(lang.get('error').inputs, BAD_REQUEST, validate.errors);
				return next(error);
			}
			let object = req.object;
			let uniqueValidationError = await processor.validateUnique(this.model, obj);
			if (uniqueValidationError) {
				return next(uniqueValidationError);
			}
			let canUpdateError = await processor.validateUpdate(object, obj);
			if (!isEmpty(canUpdateError)) {
				return next(canUpdateError);
			}
			object = await processor.updateObject(object, obj);
			req.response = {
				model: this.model,
				code: OK,
				message: this.lang.updated,
				value: object
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} The response object
	 */
	async delete(req, res, next) {
		let object = req.object;
		try {
			const processor = this.model.getProcessor(this.model);
			let canDeleteError = await processor.validateDelete(object);
			if (!isEmpty(canDeleteError)) {
				return next(canDeleteError);
			}
			if (this.model.softDelete) {
				extend(object, {deleted: true});
				object = await object.save();
			} else {
				object = await object.remove();
			}
			req.response = {
				model: this.model,
				code: OK,
				value: {_id: object._id},
				message: this.lang.deleted
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}
}

export default AppController;
