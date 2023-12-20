import express, { Router } from 'express';
import {
  addNewProduct,
  deleteProduct,
  getProductById,
  getProducts,
  modifyProduct,
  updateProduct,
} from '@/controllers/productsHandler';

const router: Router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);

router.post('/', addNewProduct);
router.delete('/:productId', deleteProduct);
router.put('/:productId', updateProduct);
router.patch('/:productId', modifyProduct);

export default router;
