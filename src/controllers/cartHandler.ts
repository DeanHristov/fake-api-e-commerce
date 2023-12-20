import {NextFunction, Request, Response as ExpressResponse} from 'express';
import {v4 as uuidv4} from 'uuid';

import ErrorResponse from '@/utils/ErrorResponse';
import {STATUS_CODE} from '@/utils/statusCodes';
import {ICart} from '@/types';
import FilteredResponse from '@/utils/FilteredResponse';
import DataFilter, {IDataFilter} from '@/utils/DataFilter';
import Utils from '@/utils/Utils';
import Response from '@/utils/Response';

/**
 * @description Fetching the all resources from the collection
 * @route {GET} /api/v1/carts
 * @access PRIVATE
 */
const getAllCarts = async (
  req: Request,
  res: ExpressResponse,
): Promise<void> => {
  const { db } = res.app.locals;
  const carts: ICart[] = await db.carts.asyncFind({});
  const cartsList: IDataFilter<ICart> = DataFilter.simplePagination<ICart>(
    carts,
    req.query,
  );

  res
    .status(STATUS_CODE.OK)
    .json(new FilteredResponse<ICart>('success', cartsList));
};

/**
 * @description Fetching a single resource from the collection
 * @route {GET} /api/v1/carts/:cartId
 * @access PRIVATE
 */
const getCartById = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { cartId } = req.params;
  const cart: ICart = await db.carts.asyncFindOne({ _id: cartId });

  if (Utils.isNull(cart)) {
    return next(
      new ErrorResponse(
        `Error! The resource is not found!`,
        STATUS_CODE.NOT_FOUND,
      ),
    );
  }

  res.status(STATUS_CODE.OK).json(new Response('success', cart));
};

/**
 * @description Fetching a single resource by userId from the collection
 * @route {GET} /api/v1/carts/users/:cartId
 * @access PRIVATE
 */
const getCartByUserId = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { userId } = req.params;
  const cart: ICart = await db.carts.asyncFindOne({ userId });

  if (Utils.isNull(cart)) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.NOT_FOUND),
    );
  }

  res.status(STATUS_CODE.OK).json(new Response('success', cart));
};

/**
 * @description Creating a new resource (Single item) and store it in the collection
 * @route {POST} /api/v1/carts
 * @access PRIVATE
 */
const addNewCart = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { userId } = req.params;
  const { currency } = req.body;

  if (Utils.isMissingFields(currency)) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.BAD_REQUEST),
    );
  }

  const newCart: ICart = {
    _id: uuidv4(),
    userId,
    currency,
    total: 0,
    discountedTotal: 0,
    totalProducts: 0,
    totalQuantity: 0,
    products: [],
  };

  await db.carts.asyncInsert(newCart);
  res.status(STATUS_CODE.OK).json(new Response('success', newCart));
};

/**
 * @description Replace the entire resource (Single item) with a new representation
 * @route {PUT} /api/v1/carts/:cartId
 * @access PRIVATE
 */
const updateCart = (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): void => {
  next(new ErrorResponse('Not implemented yet!', STATUS_CODE.NOT_IMPLEMENTED));
};

/**
 * @description Apply partial updates to a resource
 * @route {PATCH} /api/v1/carts/:cartId
 * @access PRIVATE
 */
const modifyCart = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { currency } = req.body;
  const { cartId } = req.params;
  const cart: ICart = await db.carts.asyncFindOne({ _id: cartId });

  if (Utils.isNull(cart) || Utils.isMissingFields([currency])) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.BAD_REQUEST),
    );
  }

  await db.carts.asyncUpdate({ _id: cartId }, { $set: { currency } });
  res.status(STATUS_CODE.OK).json(new Response('success'));
};

/**
 * @description Delete the entire resource from the collection
 * @route {DELETE} /api/v1/products/:productId
 * @access PRIVATE
 */
const deleteCart = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { cartId } = req.params;
  const cart: ICart = await db.carts.asyncRemove({ _id: cartId });

  if (Utils.isNull(cart)) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.NOT_FOUND),
    );
  }

  res.status(STATUS_CODE.OK).json(new Response('success', []));
};

export {
  addNewCart,
  deleteCart,
  getAllCarts,
  getCartById,
  getCartByUserId,
  modifyCart,
  updateCart,
};
