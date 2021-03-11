import {createError} from 'apollo-errors';

/**
 * This function is run on each error passed back to the client
 * @param {String} name
 * @param {String} message
 * @param {Object} data
 * @return {Object} res The response object
 */
export const GraphError = (name, message, data = {}) => {
	const CustomError = createError(name, {message, data});
	return new CustomError;
};
