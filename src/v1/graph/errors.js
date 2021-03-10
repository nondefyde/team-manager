import { createError } from 'apollo-errors';

/**
 * This function is run on each error passed back to the client
 * @param {String} name
 * @param {String} message
 * @param {Object} data
 * @return {Object} res The response object
 */
export const GraphError = (name, message, data = {}) => {
	const CustomError = createError(name, { message, data });
	return new CustomError;
};

export const ErrorsConstants = {
	USER: {
		name: 'InvalidArgument',
		invalid_profile_type: 'Invalid profile type'
	},
	INPUT: {
		name: 'BadRequest',
		invalid_profile_type: 'Invalid input'
	}
};
