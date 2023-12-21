import express, { Router } from 'express';
import {
  addNewCart,
  deleteCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  modifyCart,
  modifyCartByUserId,
  updateCart,
} from '@/controllers/cartHandler';
import grantAuthentication from '@/middlewares/grantAuthentication';
import grantAuthorization from '@/middlewares/grantAuthorization';
import { USER_ROLES } from '@/types';

const router: Router = express.Router();
router.use(grantAuthentication);

router.get('/', grantAuthorization([USER_ROLES.ADMIN]), getAllCarts);
router.get('/:cartId', grantAuthorization([USER_ROLES.ADMIN]), getCartById);
router.get('/users/:userId', getCartByUserId);

router.post(
  '/users/:userId',
  grantAuthorization([USER_ROLES.ADMIN]),
  addNewCart,
);
router.put('/:cartId', grantAuthorization([USER_ROLES.ADMIN]), updateCart);
router.patch('/:cartId', grantAuthorization([USER_ROLES.ADMIN]), modifyCart);

router.patch('/users/:userId', modifyCartByUserId);
router.delete('/:cartId', grantAuthorization([USER_ROLES.ADMIN]), deleteCart);

export default router;
