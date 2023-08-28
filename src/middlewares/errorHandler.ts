import {Request, Response} from 'express';
import ErrorResponse from '../utils/ErrorResponse';

const errorHandler = (
    err: ErrorResponse,
    req: Request,
    res: Response,
): void => {
  const error = {...err};

  res.status(error.statusCode ?? 500);
  res.json({
    statusCode: error?.statusCode ?? err?.statusCode,
    error: error?.message ?? err?.message,
    data: [],
  });
};

export default errorHandler;
