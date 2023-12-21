import { CookieOptions, Request, Response as ExpressResponse } from 'express';
import ms from 'ms';

import Utils from '@/utils/Utils';
import { STATUS_CODE } from '@/utils/statusCodes';
import Response from '@/utils/Response';

const assignTokenToResponse = (_: Request, res: ExpressResponse): void => {
  const { user } = res.locals;
  const { NODE_ENV, JWT_COOKIE_EXPIRE, USE_COOKIE } = process.env;
  const token: string = Utils.getJWToken({ userId: user._id });
  const shouldUseCookies: boolean = USE_COOKIE === 'true';

  if (shouldUseCookies) {
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + ms(JWT_COOKIE_EXPIRE as string)),
      httpOnly: true,
      secure: NODE_ENV === 'production',
    };

    res.cookie('token', token, cookieOptions);
  }

  res.status(STATUS_CODE.OK);
  res.json(new Response('success', `Bearer ${token}`));
};

export default assignTokenToResponse;
