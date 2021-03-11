import AppError from '../lib/app-error';
import {UNAUTHORIZED} from '../utils/constants';

export default (req, res, next) => {
	// check header for api key
	let apiKey = req.query.api_key || req.headers['x-api-key'];
	if (!apiKey || apiKey !== process.env.API_KEY) {
		return next(new AppError('Api key absent or Invalid', UNAUTHORIZED));
	}
	return next();
};
