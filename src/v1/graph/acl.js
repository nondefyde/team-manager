import {baseResolver} from './_core/baseResolvers';
import {ErrorsConstants, GraphError} from './errors';
import {UNAUTHORIZED} from '../../utils/constants';

export const isAuthenticatedResolver = baseResolver.createResolver(
	(root, args, context) => {
		if (!context.authId) {
			const {name, not_logged_in} = ErrorsConstants.AUTHENTICATION;
			if (context.authError) {
				throw GraphError(name, context.authError.error, {
					code: UNAUTHORIZED,
					message: 'UNAUTHORIZED'
				});
			}
			throw GraphError(name, not_logged_in, {
				code: UNAUTHORIZED,
				message: 'UNAUTHORIZED'
			});
		}
	}
);
