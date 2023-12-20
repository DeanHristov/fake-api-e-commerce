import express, { Router } from 'express';
import {
  addNewCart,
  deleteCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  modifyCart,
  updateCart,
} from '@/controllers/cartHandler';

const router: Router = express.Router();

router.get('/', getAllCarts);
router.get('/:cartId', getCartById);
router.get('/users/:userId', getCartByUserId);

router.post('/users/:userId', addNewCart);
router.put('/:cartId', updateCart);
router.patch('/:cartId', modifyCart);
router.delete('/:cartId', deleteCart);

export default router;
