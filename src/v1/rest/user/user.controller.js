/**
 * The AccountController class
 */
import AppController from '../_core/app.controller';
import {BAD_REQUEST, OK} from '../../../utils/constants';
import AppError from '../../../lib/app-error';
import lang from '../../../lang';
import UserProcessor from './user.processor';
import _ from 'lodash';

/**
 *  TaskController
 */
class UserController extends AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller¬
	 */
	constructor(model) {
		super(model);
		this.updateMe = this.updateMe.bind(this);
		this.currentUser = this.currentUser.bind(this);
		this.verifyBvn = this.verifyBvn.bind(this);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {callback} next The callback to the next program handler
	 * @return {void}
	 */
	async updateMe(req, res, next) {
		req.object = await this.model.findById(req.authId);
		super.update(req, res, next);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {void}
	 */
	async currentUser(req, res, next) {
		const user = await this.model.findById(req.authId);
		req.response = {
			model: this.model,
			code: OK,
			value: user
		};
		return next();
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async verifyBvn(req, res, next) {
		const obj = req.body;
		const validate = await this.model.getValidator().verifyBvn(req.body);
		if (!validate.passed) {
			return next(new AppError(lang.get('error').inputs, BAD_REQUEST, validate.errors));
		}
		try {
			let {data} = await UserProcessor.resolveBvn(obj.bvn);
			let user = await UserProcessor.getUser(req.authId, {});
			const updateObj = {bvnVerified: true, bvn: data};
			_.extend(user, updateObj);
			user = await user.save();
			req.response = {
				message: lang.get('auth').verification_successful,
				model: this.model,
				code: OK,
				value: user
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}
}

export default UserController;
