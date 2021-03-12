import {createRequest} from '../request';
import {formatError} from '../schema';
import config from 'config';

/**
 * The Plan Request class
 */
class MemberRequest {
	/**
	 * Get plan-list plans
	 * @param {Object} query The request object
	 * @return {Object} res The response object
	 */
	static async getMembers(query) {
		const httpConfig = {
			url: `${config.get('api.url')}/members`,
			method: 'get',
			params: {population: ['profile'], ...query},
			headers: {
				'x-api-key': process.env.API_KEY
			}
		};
		return createRequest(httpConfig)
			.then(response => response,
				err => formatError(err));
	}

	/**
	 * Get plan by id
	 * @param {String} memberId The request object
	 * @return {Object} res The response object
	 */
	static async getMember(memberId) {
		const httpConfig = {
			method: 'get',
			url: `${config.get('api.url')}/members/${memberId}`,
			headers: {
				'x-api-key': process.env.API_KEY
			},
			params: {
				population: ['profile']
			}
		};
		return createRequest(httpConfig)
			.then(response => response.data,
				err => formatError(err));
	}

	/**
	 * Get plan-list plans
	 * @param {Object} payload The request object
	 * @return {Object} res The response object
	 */
	static async createMember(payload) {
		const httpConfig = {
			method: 'post',
			url: `${config.get('api.url')}/members`,
			headers: {
				'x-api-key': process.env.API_KEY
			},
			data: {...payload},
			params: {
				population: ['profile']
			}
		};
		return createRequest(httpConfig)
			.then(response => response.data,
				err => formatError(err));
	}

	/**
	 * Get plan-list plans
	 * @param {String} memberId The request object
	 * @param {Object} payload The request object
	 * @return {Object} res The response object
	 */
	static async updateMember(memberId, payload) {
		const httpConfig = {
			method: 'put',
			url: `${config.get('api.url')}/members/${memberId}`,
			headers: {
				'x-api-key': process.env.API_KEY
			},
			data: {...payload},
			params: {
				population: ['profile']
			}
		};
		return createRequest(httpConfig)
			.then(response => response.data,
				err => formatError(err));
	}

	/**
	 * Get plan-list plans
	 * @param {String} memberId The request object
	 * @return {Object} res The response object
	 */
	static async deleteMember(memberId) {
		const httpConfig = {
			method: 'delete',
			url: `${config.get('api.url')}/members/${memberId}`,
			headers: {
				'x-api-key': process.env.API_KEY
			}
		};
		return createRequest(httpConfig)
			.then(response => response.data,
				err => formatError(err));
	}
}

export default MemberRequest;
