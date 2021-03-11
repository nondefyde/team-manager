import config from 'config';
import apiAuth from '../src/middleware/api';
import errorHandler from '../src/middleware/errors';
import apiV1 from '../src/v1';
import {NOT_FOUND} from '../src/utils/constants';
import AppError from '../src/lib/app-error';
/**
 * The routes will add all the application defined routes
 * @param {app} app The main is an instance of an express application
 * @return {Promise<void>}
 */
export default async (app) => {
	app.use(config.get('api.prefix'), apiAuth);
	app.use('/v1', apiV1);
	// check url for state codes and main version
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	app.use('*', (req, res, next) => {
		return next(new AppError('not found', NOT_FOUND));
	});
	app.use(errorHandler);
	return Promise.resolve(app);
};
