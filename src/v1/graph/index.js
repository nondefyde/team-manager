// TYPES
import rootTypes from './_core/types';
import userTypes from './user/types';
// RESOLVERS
import rootResolvers from './_core/rootResolvers';
import userResolver from './user/resolvers';

export const types = [
	rootTypes,
	userTypes
];

export const resolvers = [
	rootResolvers,
	userResolver
];
