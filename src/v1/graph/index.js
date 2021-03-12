// TYPES
import rootTypes from './_core/types';
import memberTypes from './member/types';
// RESOLVERS
import rootResolvers from './_core/rootResolvers';
import memberResolver from './member/resolvers';

export const types = [
	rootTypes,
	memberTypes
];

export const resolvers = [
	rootResolvers,
	memberResolver
];
