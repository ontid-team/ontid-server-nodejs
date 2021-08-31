import jsonWebToken from 'jsonwebtoken';
import { nanoid } from 'nanoid';

import { AppConfig } from '@config/index';

import { TokenPayload, HttpExceptionType } from '../utility-types';

import { responseError } from './response';

export const verifyToken = async <T>(
  token: string,
  secret: string,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    jsonWebToken.verify(token, secret, (error, decoded) => {
      if (error && error.name === 'TokenExpiredError') {
        return reject(responseError(HttpExceptionType.TOKEN_EXPIRED));
      }
      if (decoded) {
        return resolve(decoded as unknown as T);
      }

      return reject(responseError(HttpExceptionType.PARSE_TOKEN));
    });
  });
};

export const generateToken = (
  body: TokenPayload,
  isExpiresIn = true,
): string => {
  return jsonWebToken.sign(
    { ...body, jwtid: nanoid() },
    AppConfig.secret,
    isExpiresIn ? { expiresIn: AppConfig.secretExpiresIn } : {},
  );
};
