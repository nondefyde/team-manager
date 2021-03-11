import {Router} from 'express';

import user from './rest/member/member.route';

const router = Router();

router.use(user);

export default router;
