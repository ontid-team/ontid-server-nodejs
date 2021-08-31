/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, RequestHandler, Request, Response } from 'express';

import { MiddlewareCore } from '@core/index';
import {
  MAX_LIMIT_PAGE,
  LIMIT_PAGE,
  convertSnakeToCamelCaseInObject,
} from '@utils/index';

class QueryMiddleware extends MiddlewareCore {
  /**
   * Handler
   *
   * @returns {Function}
   */
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const query = req.query as Query;

      const queryLimit = Number(query?.limit) || LIMIT_PAGE;
      const page = Number(query?.page) || 1;
      const limit = queryLimit > MAX_LIMIT_PAGE ? MAX_LIMIT_PAGE : queryLimit;
      const skip = (page - 1) * limit;

      req.query = convertSnakeToCamelCaseInObject(query);

      const order = query.order as unknown as { [key: string]: 'ASC' | 'DESC' };

      req.ctx = {
        pagination: {
          skip,
          page,
          limit,
        },
        order,
      };

      next();
    };
  }
}

export default new QueryMiddleware();
