import config from 'config';
import apiAuth from './middleware/api';
import errorHandler from './middleware/errors';
import {NOT_FOUND} from './utils/constants';
import AppError from './lib/app-error';
import apiV1 from './v1';
import server from './v1/graph/schema';

/**
 * The routes will add all the application defined routes
 * @param {app} app The main is an instance of an express application
 * @return {Promise<void>}
 */
export default async (app) => {
	// check if api key is present
	app.use(config.get('api.prefix'), apiAuth);
	// load version 1 routes
	app.use('/v1', apiV1);

	server.applyMiddleware({
		app,
		path: `/v1/graphql`
	});

	// check url for state codes and api version
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// check if url contains empty request
	app.use('*', (req, res, next) => {
		return next(new AppError('not found', NOT_FOUND));
	});
	// load the error middleware
	app.use(errorHandler);
	return Promise.resolve(app);
};
