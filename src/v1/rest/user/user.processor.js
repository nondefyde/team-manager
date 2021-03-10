import User from './user.model';
import AppProcessor from '../_core/app.processor';
import _ from 'lodash';

/**
 * The ModuleProcessor class
 */
class UserProcessor extends AppProcessor {
	/**
	 * @param {String} authId The payload object
	 * @param {Object} obj The payload object
	 * @param {Object} session The payload object
	 * @return {Object}
	 */
	static async getUser(authId, obj, session = null) {
		let user = await User.findById(authId);
		if (!user) {
			user = await User.findOneAndUpdate({_id: authId},
				{
					$setOnInsert: {
						_id: authId,
						email: obj.email
					},
					...(_.pick(obj, ['firstName', 'lastName', 'avatar']))
				}, {
					upsert: true,
					new: true,
					setDefaultsOnInsert: true,
					session
				});
		}
		return user;
	}

	/**
	 * @param {Object} current The payload object
	 * @param {Object} obj The payload object
	 * @return {Object}
	 */
	async updateObject(current, obj) {
		try {
			const userUpdate = this.model.fillables;
			if (userUpdate && userUpdate.length > 0) {
				obj = _.pick(obj, ...userUpdate);
			}
			current = _.extend(current, {
				...obj
			});
			return current.save();
		} catch (e) {
			throw e;
		}
	}
}

export default UserProcessor;
