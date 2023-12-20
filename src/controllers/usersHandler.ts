import {NextFunction, Request, Response as ExpressResponse} from 'express';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid';

import {IUser} from '@/types';
import DataFilter, {IDataFilter} from '@/utils/DataFilter';
import {STATUS_CODE} from '@/utils/statusCodes';
import FilteredResponse from '@/utils/FilteredResponse';
import Utils from '@/utils/Utils';
import ErrorResponse from '@/utils/ErrorResponse';
import Response from '@/utils/Response';

/**
 * @description Fetching the all resources from the collection
 * @route {GET} /api/v1/users
 * @access PRIVATE
 */
const getAllUsers = async (
  req: Request,
  res: ExpressResponse,
): Promise<void> => {
  const { db } = res.app.locals;
  const users: IUser[] = await db.users.asyncFind({}, { password: 0 });
  const responseData: IDataFilter<IUser> = DataFilter.simplePagination<IUser>(
    users,
    req.query,
  );

  res
    .status(STATUS_CODE.OK)
    .json(new FilteredResponse<IUser>('success', responseData));
};

/**
 * @description Fetching a single resource from the collection
 * @route {GET} /api/v1/users/:userId
 * @access PRIVATE
 */
const getUserById = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { userId } = req.params;
  const user: IUser = await db.users.asyncFindOne(
    { _id: userId },
    { password: 0 },
  );

  if (Utils.isNull(user)) {
    return next(
      new ErrorResponse(
        `Error! The resource is not found!`,
        STATUS_CODE.NOT_FOUND,
      ),
    );
  }

  res.status(STATUS_CODE.OK).json(new Response('success', user));
};

/**
 * @description Changing the password of particular user
 * @route {PATCH} /api/v1/users/password-change
 * @access PRIVATE
 */
const updatePasswords = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { oldPassword, newPassword, userId } = req.body;
  const user: IUser = await db.users.asyncFindOne({ _id: userId });

  if (
    Utils.isNull(user) ||
    Utils.isMissingFields([oldPassword, newPassword, userId])
  ) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.BAD_REQUEST),
    );
  }

  const hasMatch: boolean = bcrypt.compareSync(oldPassword, user.password);
  if (!hasMatch) {
    return next(
      new ErrorResponse(
        `Error! The passwords do not match!`,
        STATUS_CODE.BAD_REQUEST,
      ),
    );
  }

  const salt: string = bcrypt.genSaltSync(10);
  const hashedPassword: string = bcrypt.hashSync(newPassword, salt);
  await db.users.asyncUpdate(
    { _id: userId },
    {
      $set: { ...user, password: hashedPassword },
    },
  );

  res.status(STATUS_CODE.OK).json(new Response('success'));
};

/**
 * @description Apply partial updates to a resource
 * @route {PATCH} /api/v1/users/:userId
 * @access PRIVATE
 */
const modifyUser = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { userId } = req.params;
  const { username, name, email, role } = req.body;
  const user: IUser = await db.users.asyncFindOne({ _id: userId });

  if (Utils.isNull(user)) {
    return next(
      new ErrorResponse(
        `Error! The resource is not found!`,
        STATUS_CODE.NOT_FOUND,
      ),
    );
  }

  const newUser: IUser = {
    _id: user._id,
    password: user.password,
    username: username || user.username,
    name: name || user.name,
    email: email || user.email,
    role: role || user.role,
  };

  await db.users.asyncUpdate({ _id: userId }, { $set: newUser });

  //@ts-ignore
  delete newUser['password'];
  res.status(STATUS_CODE.OK).json(new Response('success', newUser));
};

/**
 * @description Creating a new resource (Single item) and store it in the collection
 * @route {POST} /api/v1/users
 * @access PRIVATE
 */
const createUser = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { username, name, email, role, password } = req.body;

  if (Utils.isMissingFields([username, name, email, role, password])) {
    return next(
      new ErrorResponse(`Error! Bad Request!`, STATUS_CODE.BAD_REQUEST),
    );
  }

  const salt: string = bcrypt.genSaltSync(10);
  const hashedPassword: string = bcrypt.hashSync(password, salt);
  const newUser: IUser = {
    _id: uuidv4(),
    username,
    name,
    email,
    role,
    password: hashedPassword,
  };

  await db.users.asyncInsert(newUser);

  //@ts-ignore
  delete newUser['password'];
  res.status(STATUS_CODE.OK).json(new Response('success', newUser));
};

/**
 * @description Delete the entire resource from the collection
 * @route {DELETE} /api/v1/users/:userId
 * @access PRIVATE
 */
const deleteUser = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { userId } = req.params;
  const user: IUser = await db.users.asyncRemove({ _id: userId });

  if (Utils.isNull(user)) {
    return next(
      new ErrorResponse(
        `Error! The resource is not found!`,
        STATUS_CODE.NOT_FOUND,
      ),
    );
  }

  res.status(STATUS_CODE.OK).json(new Response('success', []));
};

export {
  getAllUsers,
  getUserById,
  modifyUser,
  deleteUser,
  createUser,
  updatePasswords,
};
