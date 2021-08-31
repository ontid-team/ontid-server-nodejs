import { Router } from 'express';

import { RouterCore } from '@core/index';
import { AsyncMiddleware, ValidateMiddleware } from '@middleware/index';

import UserController from './user.controller';
import { GetListUserSchema, GetOneUserSchema } from './user.schema';
import UserService from './user.service';

export default class UserRouter extends RouterCore {
  private readonly controller: UserController;

  constructor() {
    super(Router());

    this.controller = new UserController(new UserService());
  }

  init(): Router {
    this.router.get(
      '/',
      ValidateMiddleware.handler(GetListUserSchema),
      AsyncMiddleware(this.controller.getList),
    );

    this.router.get(
      '/:id',
      ValidateMiddleware.handler(GetOneUserSchema),
      AsyncMiddleware(this.controller.getOne),
    );

    return this.router;
  }
}
