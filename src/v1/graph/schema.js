import merge from 'lodash/merge';
import {ApolloServer} from 'apollo-server-express';
import createGraphQLLogger from 'graphql-log';
import {resolvers, types} from './index';
import {GraphError} from './errors';
import randomstring from 'randomstring';

const mergedResolvers = merge(...resolvers);

if (process.env.NODE_ENV === 'development') {
	const logExecutions = createGraphQLLogger();
	logExecutions(resolvers);
}
/**
 * This function is run on each error passed back to the client
 * @param {*} error
 */
export const formatError = error => {
	console.log('error >>>>> ', error);
	let serviceError = {code: error.statusCode};
	if (error.meta && error.meta.error) {
		const {message, messages = null} = error.meta.error;
		serviceError = {...serviceError, message, messages};
	} else {
		const {message, data = null} = error;
		serviceError = {...serviceError, message, messages: data};
	}
	// throw new ApolloError('ServerError', error.statusText, serviceError);
	throw GraphError('ServerError', error.message || 'Error processing request', {
		errorId: randomstring.generate(),
		...serviceError
	});
};


// GraphQL: Schema
const schema = new ApolloServer({
	typeDefs: [...types],
	resolvers: mergedResolvers,
	context: async ({req}) => {
		return null;
	},
	playground: {
		endpoint: `/v1/graphql`,
		settings: {
			'editor.theme': 'light'
		}
	},
	formatError
});

export default schema;
