import {Router} from 'express';
import User from './user.model';
import response from '../../../middleware/response';
import UserController from './user.controller';

const router = Router();

const userCtrl = new UserController(User);

router.route('/users/me')
	.get(userCtrl.currentUser, response)
	.put(userCtrl.updateMe, response);

router.route('/users')
	.get(userCtrl.find, response);
router.param('id', userCtrl.id, response);
router.route('/users/:id')
	.get(userCtrl.findOne, response)
	.put(userCtrl.update, response);

export default router;
