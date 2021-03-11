import Validator from 'validatorjs';
import AppValidation from '../_core/app.validation';

/**
 * The User Validation class
 */
class MemberValidation extends AppValidation {
	/**
	 * @param {Object} obj The object to validate
	 * @return {Object} Validator
	 */
	create(obj) {
		const rules = {
			'email': 'required|email',
			'firstName': 'required|string',
			'lastName': 'required|string',
			'tags': 'array',
			'profileType': ['required', {'in': ['Employee', 'Contractor']}],
			'profile': 'required',
			'profile.role': 'required_if:profileType,Employee|string',
			'profile.startDate': 'required_if:profileType,Contractor|date',
			'profile.endDate': 'required_if:profileType,Contractor|date'
		};
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}

	/**
	 * @param {Object} obj The object to validate
	 * @return {Object} Validator
	 */
	update(obj) {
		const rules = {
			'email': 'email',
			'firstName': 'string',
			'lastName': 'string',
			'tags': 'array',
			'profile.role': 'string',
			'profile.startDate': 'date',
			'profile.endDate': 'date'
		};
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
}

export default MemberValidation;
