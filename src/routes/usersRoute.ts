import express, { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  modifyUser,
  updatePasswords,
} from '@/controllers/usersHandler';
import grantAuthentication from '@/middlewares/grantAuthentication';
import grantAuthorization from '@/middlewares/grantAuthorization';
import { USER_ROLES } from '@/types';

const router: Router = express.Router();
router.use(grantAuthentication);

router.get('/', grantAuthorization([USER_ROLES.ADMIN]), getAllUsers);
router.get('/:userId', getUserById);

router.post('/', grantAuthorization([USER_ROLES.ADMIN]), createUser);
router.patch('/password-change', updatePasswords);
router.patch('/:userId', grantAuthorization([USER_ROLES.ADMIN]), modifyUser);
router.delete('/:userId', grantAuthorization([USER_ROLES.ADMIN]), deleteUser);
export default router;
