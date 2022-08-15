import { NextFunction, Request, RequestHandler, Response } from 'express';

import { MiddlewareCore } from '@core';
import { StringHelper } from '@utils/helpers';

class QueryMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req.query = StringHelper.convertSnakeToCamelCaseInObject(req.query);

      next();
    };
  }
}

export default new QueryMiddleware();
