import { Request, Response, NextFunction, RequestHandler } from 'express';

import { MiddlewareCore } from '@core';
import { StringHelper } from '@utils/helpers';

class QueryMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      req.query = StringHelper.convertSnakeToCamelCaseInObject(req.query);

      next();
    };
  }
}

export default new QueryMiddleware();
