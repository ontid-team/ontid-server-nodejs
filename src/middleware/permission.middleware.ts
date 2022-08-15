import { NextFunction, Request, RequestHandler, Response } from 'express';

import { MiddlewareCore } from '@core';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

class PermissonMiddleware extends MiddlewareCore {
  handler(roles: string[]): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const userRoles = req.user.role;
      let hasAccess = false;

      if (Array.isArray(userRoles)) {
        hasAccess = userRoles.some((r: string) => roles.includes(r));
      } else {
        hasAccess = roles.includes(userRoles);
      }

      if (hasAccess) {
        return next();
      }

      return next(ResponseHelper.error(HttpException.FORBIDDEN));
    };
  }
}

export default new PermissonMiddleware();
