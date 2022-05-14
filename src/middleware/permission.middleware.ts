import { Request, Response, NextFunction, RequestHandler } from 'express';

import { MiddlewareCore } from '@core';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

class PermissonMiddleware extends MiddlewareCore {
  handler(roles: string[]): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const userRoles = req?.user?.role;
      const hasAccess = Array.isArray(userRoles)
        ? userRoles.some((r: string) => roles.includes(r))
        : roles.includes(userRoles);

      if (hasAccess) {
        return next();
      }

      return next(ResponseHelper.error(HttpException.FORBIDDEN));
    };
  }
}

export default new PermissonMiddleware();
