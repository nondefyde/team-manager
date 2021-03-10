import {createRequest} from '../request';
import {formatError} from '../schema';
import config from 'config';

/**
 * The Plan Request class
 */
class UserRequest {
	/**
	 * Get plan by id
	 * @param {String} token The request object
	 * @param {string} userId The request object
	 * @return {Object} res The response object
	 */
	static async getUser(token, userId) {
		const httpConfig = {
			method: 'get',
			url: `${config.get('api.url')}/users/${userId}`,
			headers: {
				'x-access-token': token
			},
			params: {
				population: ['auth']
			}
		};
		return createRequest(httpConfig)
			.then(response => response.data,
				err => formatError(err));
	}

	/**
	 * Get plan-list plans
	 * @param {Object} token The request object
	 * @param {Object} query The request object
	 * @return {Object} res The response object
	 */
	static async getUsers(token, query) {
		const {pagination, ...rest} = query;
		const httpConfig = {
			url: `${config.get('api.url')}/users`,
			method: 'get',
			params: {population: ['auth'], ...pagination, ...rest},
			headers: {
				'x-access-token': token
			}
		};
		return createRequest(httpConfig)
			.then(response => response,
				err => formatError(err));
	}
}

export default UserRequest;
