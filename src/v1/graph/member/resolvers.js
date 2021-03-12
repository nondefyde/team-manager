import MemberService from './service';
import {baseResolver} from '../_core/baseResolvers';

export default {
	Query: {
		getMembers: baseResolver.createResolver((root, {query}, {}) => {
			return MemberService.getMembers(query);
		}),
		getMember: baseResolver.createResolver((root, {memberId}, {}) => {
			return MemberService.getMember(memberId);
		})
	},
	Mutation: {
		createMember: baseResolver.createResolver((root, {createInput}, {}) => {
			return MemberService.createMember(createInput);
		}),
		updateMember: baseResolver.createResolver((root, {memberId, updateInput}, {}) => {
			return MemberService.updateMember(memberId, updateInput);
		}),
		deleteMember: baseResolver.createResolver((root, {memberId}, {}) => {
			return MemberService.deleteMember(memberId);
		})
	},
	Profile: {
		__resolveType(obj, context, info) {
			return obj.profileType;
		}
	}
};
