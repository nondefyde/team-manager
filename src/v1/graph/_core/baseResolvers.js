import { createResolver } from 'apollo-resolvers';

export const baseResolver = createResolver(
	// incoming requests will pass through this resolver like a no-op
	null
);
