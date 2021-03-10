import User from '../user/user.model';
import AppError from '../../../lib/app-error';
import {CONFLICT, NOT_FOUND} from '../../../utils/constants';

const UserMiddleWare = {
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async bvnVerified(req, res, next) {
		let user = await User.findById(req.authId);
		if (!user) {
			return next(new AppError('user not found', NOT_FOUND));
		}
		if (user && user.bvnVerified) {
			return next(new AppError('bvn already verified', CONFLICT));
		}
		next();
	}
};

export default UserMiddleWare;
