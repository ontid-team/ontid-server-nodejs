import { HttpExceptionCore } from '@core';

import { CodeResponse, HttpException } from '../code-response';

export const error = (
  code: HttpException,
  ctx?: Partial<Pick<HttpExceptionType, 'message' | 'errors'>>,
): HttpExceptionCore =>
  new HttpExceptionCore({
    ...CodeResponse[code],
    ...ctx,
  });

export const success = (code: HttpException): HttpExceptionType =>
  CodeResponse[code];

export const custom = (ctx?: Partial<HttpExceptionType>): HttpExceptionCore => {
  return new HttpExceptionCore(ctx);
};
