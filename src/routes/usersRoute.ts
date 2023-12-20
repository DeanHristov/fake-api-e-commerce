import express, { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  modifyUser,
  updatePasswords,
} from '@/controllers/usersHandler';

const router: Router = express.Router();

router.get('/', getAllUsers);
router.get('/:userId', getUserById);

router.post('/', createUser);
router.patch('/password-change', updatePasswords);
router.patch('/:userId', modifyUser);
router.delete('/:userId', deleteUser);
export default router;
