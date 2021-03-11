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
			'firstName': 'required|string',
			'lastLame': 'required|string',
			'skills': 'required|array'
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
			'firstName': 'string',
			'lastLame': 'string',
			'skills': 'array'
		};
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
}

export default MemberValidation;
