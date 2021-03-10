import AppError from '../../../lib/app-error';

/**
 * The App Validation class
 */
class AppValidation {
	/**
	 * @param {Object} obj The object to validate
	 * @return {Object} Validator
	 */
	async create(obj) {
		return AppError.formatInputError({value: obj});
	}

	/**
	 * @param {Object} obj The object to validate
	 * @return {Object} Validator
	 */
	async update(obj) {
		return AppError.formatInputError({value: obj});
	}
}

export default AppValidation;
