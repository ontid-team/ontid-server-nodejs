import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { ControllerCore } from '@core';
import { HttpStatus, HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { MediaDTO } from './dto';
import { IMediaService } from './interface';

/**
 * @openapi
 * tags:
 *   name: Media
 *   description: media
 */
@injectable()
export default class MediaController extends ControllerCore {
  constructor(@inject('MediaService') private readonly service: IMediaService) {
    super();
  }

  /**
   * @openapi
   * /api/media:
   *   post:
   *      tags: [Media]
   *      description: Upload file
   *      requestBody:
   *        $ref: '#/components/requestBodies/MediaRequest'
   *      responses:
   *        201:
   *          $ref: '#/components/responses/MediaResponse'
   *      security:
   *        - cookie: []
   */
  async upload(req: Request, res: Response) {
    if (req?.files?.[0]) {
      const {
        filename: path,
        originalname: name,
        mimetype: mimeType,
        size,
      } = req.files[0] as Express.Multer.File;

      const data = await this.service.create({
        path,
        mimeType,
        name,
        size,
      });

      return this.response(res, {
        data,
        dto: MediaDTO,
        status: HttpStatus.Created,
      });
    }

    return this.response(res, {
      data: ResponseHelper.error(HttpException.FILE_FORMAT),
      status: HttpStatus.InternalServerError,
    });
  }
}
