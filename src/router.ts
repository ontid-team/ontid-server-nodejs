import { Application, NextFunction, Request, Response } from 'express';

import { i18n } from '@lib';
import { MediaRouter } from '@modules/media';
import { UserRouter } from '@modules/user';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

export default (app: Application): void => {
  app.use('/api/users', new UserRouter().init());
  app.use('/api/media', new MediaRouter().init());

  app.use((req: Request, _res: Response, next: NextFunction) =>
    !req.route
      ? next(
          ResponseHelper.error(HttpException.NOT_FOUND, {
            message: i18n()['notFound.router'],
          }),
        )
      : next(),
  );
};
