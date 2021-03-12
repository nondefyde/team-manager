/**
 * The AccountController class
 */
import AppController from '../_core/app.controller';
import {OK} from '../../../utils/constants';
import mongoose from 'mongoose';
import seedData from '../../../setup/seed';

/**
 *  TaskController
 */
class MemberController extends AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller¬
	 */
	constructor(model) {
		super(model);
		this.seed = this.seed.bind(this);
	}


	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @return {Object} res The response object
	 */
	async seed(req, res) {
		if (req.query.purge) {
			const collections = await mongoose.connection.db.collections();
			for (let collection of collections) {
				await collection.remove();
			}
			console.log('dropped :::: ');
		}
		console.log('req.query :::: ', req.query);
		const seeded = await seedData(req.query.size);
		return res.status(OK).json({success: true, seeded});
	}
}

export default MemberController;
