import { CookieOptions, Response as ExpressResponse, Request } from 'express';
import ms from 'ms';

import Response from '@/utils/Response';
import Utils from '@/utils/Utils';
import { STATUS_CODE } from '@/utils/statusCodes';

const assignTokenToResponse = (_: Request, res: ExpressResponse): void => {
  const { NODE_ENV, JWT_COOKIE_EXPIRE, USE_COOKIE } = process.env;
  const {
    user: { _id: userId, ...rest },
  } = res.locals;
  const token: string = Utils.getJWToken({ userId, ...rest });
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
