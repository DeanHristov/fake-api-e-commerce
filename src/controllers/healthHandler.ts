import { Request, Response as NextResponse } from 'express';
import Response from '@/utils/Response';
import { STATUS_CODE } from '@/utils/statusCodes';

export const health = async (req: Request, res: NextResponse) => {
  res.status(STATUS_CODE.OK).json(new Response('Ok'));
};
