import UserRequest from './request';

/**
 * UserProcessor class
 */
const UserService = {
	/**
	 * Get User by id
	 * @param {String} token The request object
	 * @param {String} userId The request object
	 * @return {Object} res The response object
	 */
	async getUser(token, userId = null) {
		let user = await UserRequest.getUser(token, userId);
		return this.processObject(user);
	},
	/**
	 * Get User by id
	 * @param {String} token The request object
	 * @param {String} userId The request object
	 * @param {Object} userInput The request object
	 * @return {Object} res The response object
	 */
	async updateUser(token, userId = null, userInput) {
		let user = await UserRequest.getUser(token, userId);
		// user = await userProcessor.updateObject(user, userInput);
		return this.processObject(user);
	},
	/**
	 * @param {Object} data The request object
	 * @return {Object} res The response object
	 */
	async processObject(data) {
		return data;
	}
};

export default UserService;
