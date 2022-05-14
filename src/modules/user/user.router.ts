import { Router } from 'express';
import { container } from 'tsyringe';

import { RouterCore } from '@core';
import { AsyncMiddleware, ValidateMiddleware } from '@middleware';

import UserController from './user.controller';
import { GetListUserSchema, GetOneUserSchema } from './user.schema';

export default class UserRouter extends RouterCore {
  private readonly controller: UserController;

  constructor() {
    super(Router());

    this.controller = container.resolve(UserController);
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
