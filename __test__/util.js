import Member from '../src/v1/rest/member/member.model';
import Employee from '../src/v1/rest/member/profiles/employee.model';
import Contractor from '../src/v1/rest/member/profiles/contractor.model';

/**
 * Empty collections
 */
export const EmptyAuthCollections = async () => {
	await Member.deleteMany({});
	await Employee.deleteMany({});
	await Contractor.deleteMany({});
};
