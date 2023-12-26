import { Response as ExpressResponse, NextFunction, Request } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import ErrorResponse from '@/utils/ErrorResponse';
import Utils from '@/utils/Utils';
import { STATUS_CODE } from '@/utils/statusCodes';

const grantAuthentication = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { JWT_SECRET } = process.env;
  const { authorization } = req.headers;
  let { token } = req.cookies;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (Utils.isNull(token)) {
    return next(
      new ErrorResponse(
        'Error! Authentication is required!',
        STATUS_CODE.UNAUTHORIZED,
      ),
    );
  }

  try {
    const decodedToken: JwtPayload = jwt.verify(
      token,
      JWT_SECRET as Secret,
    ) as JwtPayload;

    res.locals.user = decodedToken;
    next();
  } catch (reason) {
    next(
      new ErrorResponse(
        'Error! Your token is expired!',
        STATUS_CODE.UNAUTHORIZED,
      ),
    );
  }
};

export default grantAuthentication;
