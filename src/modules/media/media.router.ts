import { Router } from 'express';

import { RouterCore } from '@core/index';
import { UploadFileMiddleware, AsyncMiddleware } from '@middleware/index';

import MediaController from './media.controller';
import MediaService from './media.service';

export default class MediaRouter extends RouterCore {
  private readonly mediaController: MediaController;

  constructor() {
    super(Router());

    this.mediaController = new MediaController(new MediaService());
  }

  init() {
    this.router.post(
      '/',
      UploadFileMiddleware.handler(),
      AsyncMiddleware(this.mediaController.upload),
    );

    return this.router;
  }
}
