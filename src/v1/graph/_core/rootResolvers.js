import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import moment from 'moment-timezone';

export default {
	Date: new GraphQLScalarType({
		name: 'Date',
		description: 'Date custom scalar type',
		parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize(value) {
			// return value.getTime(); // value sent to the client
			return value.toISOString(); // value sent to the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			}
			return null;
		}
	}),
	UTCMoment: new GraphQLScalarType({
		name: 'UTCMoment',
		description: 'Moment date in UTC timezone',
		parseValue(value) {
			return moment.utc(value);
		},
		serialize(value) {
			return value.toISOString();
		},
		parseLiteral(ast) {
			return moment.utc(ast);
		}
	})
};
