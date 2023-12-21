import { NextFunction, Request, Response as ExpressResponse } from 'express';
import bcrypt from 'bcryptjs';

import Utils from '@/utils/Utils';
import { STATUS_CODE } from '@/utils/statusCodes';
import ErrorResponse from '@/utils/ErrorResponse';
import { IUser } from '@/types';
import Response from '@/utils/Response';

const signIn = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { db } = res.app.locals;
  const { email, password } = req.body;
  const errorResponse: ErrorResponse = new ErrorResponse(
    'Error! Invalid credentials!',
    STATUS_CODE.BAD_REQUEST,
  );

  if (Utils.isMissingFields([email, password])) {
    return next(errorResponse);
  }

  const user: IUser = await db.users.asyncFindOne({ email });
  if (Utils.isNull(user)) return next(errorResponse);

  const hasMatch: boolean = bcrypt.compareSync(password, user.password);
  if (!hasMatch) return next(errorResponse);

  res.locals.user = user;
  next();
};

const signOut = async (req: Request, res: ExpressResponse): Promise<void> => {
  // TODO Store the token in block list until the date expire

  res
    .status(STATUS_CODE.OK)
    .clearCookie('token')
    .json(new Response('success', { ['sign-out']: true }));
};

export { signOut, signIn };
