import {Router} from 'express';
import Member from './member.model';
import response from '../../../middleware/response';
import MemberController from './member.controller';

const router = Router();

const memberCtrl = new MemberController(Member);


router.route('/members')
	.get(memberCtrl.find, response)
	.post(memberCtrl.create, response);

router.param('id', memberCtrl.id, response);
router.route('/members/:id')
	.get(memberCtrl.findOne, response)
	.put(memberCtrl.update, response);

export default router;
