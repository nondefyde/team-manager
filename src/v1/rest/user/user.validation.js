import Validator from 'validatorjs';
import AppValidation from '../_core/app.validation';

/**
 * The User Validation class
 */
class UserValidation extends AppValidation {
	/**
	 * @param {Object} obj The object to validate
	 * @return {Object} Validator
	 */
	update(obj) {
		const rules = {
			'username': 'string'
		};
		if (obj.location) {
			rules['location.country'] = 'required|string';
			rules['location.state'] = 'required|string';
		}
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	async verifyBvn(obj) {
		const rules = {
			bvn: 'required',
		};
		const validator = new Validator(obj, rules, {
			'bvn.required': 'Your bvn is required',
		});
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
}

export default UserValidation;
