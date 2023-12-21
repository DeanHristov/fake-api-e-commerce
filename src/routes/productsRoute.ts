import express, { Router } from 'express';
import {
  addNewProduct,
  deleteProduct,
  getProductById,
  getProducts,
  modifyProduct,
  updateProduct,
} from '@/controllers/productsHandler';
import { USER_ROLES } from '@/types';
import grantAuthorization from '@/middlewares/grantAuthorization';
import grantAuthentication from '@/middlewares/grantAuthentication';

const router: Router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);

router.post(
  '/',
  [grantAuthentication, grantAuthorization([USER_ROLES.ADMIN])],
  addNewProduct,
);
router.delete(
  '/:productId',
  [grantAuthentication, grantAuthorization([USER_ROLES.ADMIN])],
  deleteProduct,
);
router.put(
  '/:productId',
  [grantAuthentication, grantAuthorization([USER_ROLES.ADMIN])],
  updateProduct,
);
router.patch(
  '/:productId',
  [grantAuthentication, grantAuthorization([USER_ROLES.ADMIN])],
  modifyProduct,
);

export default router;
