import { NextFunction, RequestHandler, Request, Response } from 'express';

import { AppConfig } from '@config/index';
import { MiddlewareCore } from '@core/index';

class InitMiddleware extends MiddlewareCore {
  /**
   * Handler
   *
   * @returns {Function}
   */
  handler(): RequestHandler {
    return (_req: Request, res: Response, next: NextFunction) => {
      res.header('X-Server', AppConfig.name);
      next();
    };
  }
}

export default new InitMiddleware();
