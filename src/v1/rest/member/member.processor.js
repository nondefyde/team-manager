import AppProcessor from '../_core/app.processor';
import {extend, pick} from 'lodash';

/**
 * The ModuleProcessor class
 */
class MemberProcessor extends AppProcessor {
	/**
	 * @param {Object} current The payload object
	 * @param {Object} obj The payload object
	 * @return {Object}
	 */
	async updateObject(current, obj) {
		try {
			const userUpdate = this.model.fillables;
			if (userUpdate && userUpdate.length > 0) {
				obj = pick(obj, ...userUpdate);
			}
			current = extend(current, {
				...obj
			});
			return current.save();
		} catch (e) {
			throw e;
		}
	}
}

export default MemberProcessor;
