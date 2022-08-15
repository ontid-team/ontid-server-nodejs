import { NextFunction, Request, RequestHandler, Response } from 'express';

import { MiddlewareCore } from '@core';
import { LIMIT_ITEM, MAX_LIMIT_ITEM } from '@utils';
import { IPHelper, UserAgentHelper } from '@utils/helpers';

class ContextMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const userAgent = req.headers['user-agent'] || '';
      const queryLimit = Number(req?.query?.limit) || LIMIT_ITEM;
      const page = Number(req?.query?.page) || 1;
      const limit = queryLimit > MAX_LIMIT_ITEM ? MAX_LIMIT_ITEM : queryLimit;

      req.ctx = Object.freeze({
        ...req.ctx,
        ip: IPHelper.getIP(req),
        userAgent,
        os: UserAgentHelper.getOS(userAgent),
        browser: UserAgentHelper.getBrowser(userAgent),
        pagination: {
          skip: (page - 1) * limit,
          page,
          limit,
        },
        order: (req?.query?.order as { [key: string]: 'ASC' | 'DESC' }) || null,
      });

      next();
    };
  }
}

export default new ContextMiddleware();
