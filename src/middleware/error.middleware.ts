import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { HttpExceptionCore, MiddlewareCore } from '@core';
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  CodeResponse,
  HttpException,
  HttpStatus,
} from '@utils';
import { CookieHelper } from '@utils/helpers';

class ErrorMiddleware extends MiddlewareCore {
  handler(): ErrorRequestHandler {
    return (
      error: HttpExceptionCore,
      _req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: NextFunction,
    ) => {
      let response = CodeResponse.SERVER_ERROR;

      if (
        error.name === 'EntityNotFound' ||
        error.name === 'EntityNotFoundError'
      ) {
        response = CodeResponse.NOT_FOUND;
      } else if (error.status === HttpStatus.BadRequest) {
        response = {
          ...error,
          message: error.message || CodeResponse.SERVER_ERROR.message,
          code: HttpException.BAD_REQUEST,
        };
      } else if (error.code && error.status && error.message) {
        response = { ...error };
      }

      if (
        error.code === HttpException.REFRESH_TOKEN_EXPIRED ||
        error.code === HttpException.REFRESH_TOKEN_VERIFY
      ) {
        CookieHelper.deleteOne(res, COOKIE_ACCESS_TOKEN);
        CookieHelper.deleteOne(res, COOKIE_REFRESH_TOKEN);
      }

      const errorRes = new HttpExceptionCore(response);

      res.status(errorRes.status).json(errorRes);
    };
  }
}

export default new ErrorMiddleware();
