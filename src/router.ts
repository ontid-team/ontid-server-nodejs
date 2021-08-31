import { Express, NextFunction, Response, Request } from 'express';

import { UserRouter } from '@modules/user';
import { responseError, HttpExceptionType } from '@utils/index';

export default (app: Express): void => {
  app.use('/api/users', new UserRouter().init());

  app.use((req: Request, _res: Response, next: NextFunction) =>
    !req.route
      ? next(responseError(HttpExceptionType.ROUTE_NOT_FOUND))
      : next(),
  );
};
