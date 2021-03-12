import MemberRequest from './request';

/**
 * MemberProcessor class
 */
const MemberService = {
	/**
	 * Get Member by id
	 * @param {Object} query The request query string
	 * @return {Object} res The response object
	 */
	async getMembers(query = {}) {
		let {data = [], meta: {pagination}} = await MemberRequest.getMembers(query);
		return {
			data: data.map((d) => ({...this.processObject(d)})),
			pagination
		};
	},
	/**
	 * Get Member by id
	 * @param {String} memberId The request object
	 * @return {Object} res The response object
	 */
	async getMember(memberId) {
		let data = await MemberRequest.getMember(memberId);
		return {
			...this.processObject(data)
		};
	},
	/**
	 * Get Member by id
	 * @param {Object} memberInput The request object
	 * @return {Object} res The response object
	 */
	async createMember(memberInput) {
		const payload = {
			...memberInput,
			profile: {
				...memberInput.profile.employee,
				...memberInput.profile.contractor
			}
		};
		let data = await MemberRequest.createMember(payload);
		return {
			...this.processObject(data)
		};
	},
	/**
	 * Get Member by id
	 * @param {String} memberId The request object
	 * @param {Object} memberInput The request object
	 * @return {Object} res The response object
	 */
	async updateMember(memberId = null, memberInput) {
		const payload = {
			...memberInput,
			profile: {
				...memberInput.profile.employee,
				...memberInput.profile.contractor
			}
		};
		let data = await MemberRequest.updateMember(memberId, payload);
		return {
			...this.processObject(data)
		};
	},
	/**
	 * Get Member by id
	 * @param {String} memberId The request object
	 * @return {Object} res The response object
	 */
	async deleteMember(memberId = null) {
		const member = await MemberRequest.deleteMember(memberId);
		return {
			_id: member._id
		};
	},
	/**
	 * @param {Object} data The request object
	 * @return {Object} res The response object
	 */
	processObject(data) {
		return {
			...data,
			profile: {
				...data.profile,
				profileType: data.profileType
			}
		};
	}
};

export default MemberService;
