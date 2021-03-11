/**
 * The AccountController class
 */
import AppController from '../_core/app.controller';

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
		// this.updateMe = this.updateMe.bind(this);
	}
}

export default MemberController;
