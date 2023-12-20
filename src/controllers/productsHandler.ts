import {NextFunction, Request, Response as ExpressResponse} from 'express'; // import { v4 as uuidv4 } from 'uuid';
import {v4 as uuidv4} from 'uuid';
import {IProduct} from '@/types';
import DataFilter, {IDataFilter} from '@/utils/DataFilter';
import ErrorResponse from '@/utils/ErrorResponse';
import FilteredResponse from '@/utils/FilteredResponse';
import Response from '@/utils/Response';
import Utils from '@/utils/Utils';
import {STATUS_CODE} from '@/utils/statusCodes';

/**
 * @description Fetching the all resources from the collection
 * @route {GET} /api/v1/products
 * @access PUBLIC
 */
const getProducts = async (req: Request, res: ExpressResponse) => {
  const { db } = res.app.locals;
  const products: IProduct[] = await db.products.asyncFind({});
  const productList: IDataFilter<IProduct> =
    DataFilter.simplePagination<IProduct>(products, req.query);

  res
    .status(STATUS_CODE.OK)
    .json(new FilteredResponse<IProduct>('success', productList));
};

/**
 * @description Fetching a single resource from the collection,
 * @route {GET} /api/v1/products/:productId
 * @access PUBLIC
 */
const getProductById = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { productId } = req.params;
  const { db } = res.app.locals;
  const product: IProduct = await db.products.asyncFindOne({
    _id: productId,
  });

  if (Utils.isNull(product)) {
    return next(
      new ErrorResponse(
        `Error! The resource is not found!`,
        STATUS_CODE.NOT_FOUND,
      ),
    );
  }
  res.status(STATUS_CODE.OK).json(new Response('success', product));
};

/**
 * @description Creating a new resource (Single item) and store it in the collection
 * @route {POST} /api/v1/carts
 * @access PRIVATE
 */
const addNewProduct = async (req: Request, res: ExpressResponse) => {
  const { db } = res.app.locals;
  const inputData = req.body;

  // TODO Check if the all required fields are available!

  const newProduct: IProduct = {
    ...inputData,
    _id: uuidv4(),
  };

  await db.products.asyncInsert(newProduct);
  res.status(STATUS_CODE.OK).json(new Response('success', newProduct));
};

/**
 * @description Replace the entire resource (Single item) with a new representation
 * @route {PUT} /api/v1/products/:productId
 * @access PRIVATE
 */
const updateProduct = (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
) => {
  next(new ErrorResponse('Not implemented yet!', STATUS_CODE.NOT_IMPLEMENTED));
};

/**
 * @description Apply partial updates to a resource
 * @route {PATCH} /api/v1/products/:productId
 * @access PRIVATE
 */
const modifyProduct = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { productId } = req.params;
  const { db } = res.app.locals;
  const inputFields: string[] = Object.keys(req.body);
  const product: IProduct = await db.products.asyncFindOne({ _id: productId });

  if (Utils.isNull(product)) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.BAD_REQUEST),
    );
  }
  const newProduct = {
    _id: productId,
  };
  for (const key of inputFields) {
    if (key === '_id') continue;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newProduct[key] = req.body[key] || product[key];
  }

  await db.products.asyncUpdate({ _id: productId }, { $set: newProduct });
  res.status(STATUS_CODE.OK).json(new Response('success'));
};

/**
 * @description Delete the entire resource from the collection
 * @route {DELETE} /api/v1/products/:productId
 * @access PRIVATE
 */
const deleteProduct = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
) => {
  const { db } = res.app.locals;
  const { productId } = req.params;
  const product = await db.products.asyncRemove({ _id: productId });

  if (Utils.isNull(product)) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.BAD_REQUEST),
    );
  }

  res.status(STATUS_CODE.OK).json(new Response('success', []));
};

export {
  deleteProduct,
  getProductById,
  getProducts,
  modifyProduct,
  updateProduct,
  addNewProduct,
};
