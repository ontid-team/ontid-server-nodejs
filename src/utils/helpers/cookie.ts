import { Response } from 'express';

export const setCookies = (
  res: Response,
  name: string,
  data: string | number | null,
  options: { isLogout?: boolean; httpOnly: boolean },
) => {
  const { httpOnly, isLogout } = options;

  res.cookie(name, data, {
    httpOnly,
    sameSite: 'strict',
    // domain: AppConfig.clientHost,
    ...(isLogout && { maxAge: 0 }),
  });
};
