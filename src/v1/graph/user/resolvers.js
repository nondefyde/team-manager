import {isAuthenticatedResolver} from '../acl';
import UserService from './service';

export default {
	Query: {
		getUser: isAuthenticatedResolver.createResolver((root, {userId}, {token}) => {
			return UserService.getUser(token, userId);
		})
	},
	Mutation: {
		updateUser: isAuthenticatedResolver.createResolver((root, {userInput}, {authId, token}) => {
			return UserService.updateUser(token, authId, userInput);
		})
	}
};
