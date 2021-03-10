import axios from 'axios';

const https = require('https');

const baseUrl = process.env.BILLING_SERVICE;
const defaultOptions = {
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	}),
	baseURL: baseUrl,
	headers: {}
};


const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
	config => {
		config.headers['x-api-key'] = process.env.API_KEY;
		return config;
	},
	error => {
		// Do something with request error
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	response => {
		// Do something with response data
		return response.data;
	},
	error => {
		if (error.response) {
			// The request was made and the server responded with a task-status code
			// that falls out of the range of 2xx
			// throw error.response.data;
			const {data, status, statusText} = error.response;
			return Promise.reject({...data, statusCode: status, statusText: statusText});
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log('error request', error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
	}
);

/**
 * create request
 * @param {Object} config The request object
 * @return {Object} res The response object
 */
export const createRequest = config => instance(config);
