import { Router } from 'express';
import { container } from 'tsyringe';

import { RouterCore } from '@core';
import { AsyncMiddleware, UploadFileMiddleware } from '@middleware';

import MediaController from './media.controller';

export default class MediaRouter extends RouterCore {
  private readonly controller: MediaController;

  constructor() {
    super(Router());

    this.controller = container.resolve(MediaController);
  }

  init(): Router {
    this.router.post(
      '/',
      UploadFileMiddleware.handler(),
      AsyncMiddleware(this.controller.upload.bind(this.controller)),
    );

    return this.router;
  }
}
