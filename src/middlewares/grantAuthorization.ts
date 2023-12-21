import { NextFunction, Request, Response as ExpressResponse } from 'express';
import ErrorResponse from '../utils/ErrorResponse';
import { STATUS_CODE } from '@/utils/statusCodes';
import { USER_ROLES } from '@/types';

const grantAuthorization =
  (roles: USER_ROLES[]) =>
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    const { role } = res.locals.user;

    if (!roles.includes(role)) {
      return next(
        new ErrorResponse(
          `Error! You are not authorize to perform this action!`,
          STATUS_CODE.FORBIDDEN,
        ),
      );
    }

    next();
  };

export default grantAuthorization;
