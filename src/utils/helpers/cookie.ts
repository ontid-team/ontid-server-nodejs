import { Response } from 'express';

import { AppConfig, JWTConfig } from '@config';

import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from '../constants';

import * as DateHelper from './date';

const isObject = (item: any): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const getExpiresIn = (key: string) => {
  switch (key) {
    case COOKIE_REFRESH_TOKEN:
    case COOKIE_ACCESS_TOKEN:
      return JWTConfig.expiresInRefreshToken;
    default:
      return null;
  }
};

export const setOne = (
  res: Response,
  name: string,
  data: string | number | boolean | null,
  options?: { expires?: Date; httpOnly?: boolean; isLogout?: boolean },
) => {
  const { httpOnly, isLogout, expires } = options || {};

  res.cookie(name, data, {
    sameSite: 'strict',
    domain: AppConfig.domain,
    ...(httpOnly && name !== COOKIE_ACCESS_TOKEN && { httpOnly }),
    ...(expires && { expires }),
    ...(isLogout && { maxAge: 0 }),
  });
};

export const setMany = <T>(
  res: Response,
  data: T,
  options?: { httpOnly?: boolean; isLogout?: boolean },
) => {
  if (data && isObject(data)) {
    for (const key in data) {
      const expiresIn = getExpiresIn(key);

      if ({}.hasOwnProperty.call(data, key)) {
        setOne(
          res,
          key,
          data[key] as unknown as string | number | boolean | null,
          {
            ...(options && { ...options }),
            ...(expiresIn && {
              expires: DateHelper.addMillisecondToDate(
                new Date(),
                DateHelper.toMs(expiresIn),
              ),
            }),
          },
        );
      }
    }
  }
};

export const deleteOne = (res: Response, name: string) => {
  setOne(res, name, null, { isLogout: true });
};

export const deleteMany = (res: Response, cookies: object) => {
  if (cookies && isObject(cookies)) {
    for (const key in cookies) {
      if ({}.hasOwnProperty.call(cookies, key)) {
        deleteOne(res, key);
      }
    }
  }
};
