import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { ControllerCore } from '@core';
import { i18n } from '@lib';
import { HttpException, HttpStatus } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { MediaDTO } from './dto';
import { IMediaService } from './interface';
import { MediaInject } from './media.type';

/**
 * @openapi
 * tags:
 *   name: Media
 *   description: media
 */
@injectable()
export default class MediaController extends ControllerCore {
  constructor(
    @inject(MediaInject.MEDIA_SERVICE) private readonly service: IMediaService,
  ) {
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
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async upload(req: Request, res: Response) {
    const { userId } = req.user as Required<UserContext>;

    if (req?.files?.[0]) {
      const {
        filename: path,
        originalname: name,
        mimetype: mimeType,
        fieldname,
        size,
      } = req.files[0] as Express.Multer.File;

      const data = await this.service.create(
        {
          path,
          mimeType,
          name,
          size,
          createdById: userId,
        },
        { fieldname },
      );

      return this.response(res, {
        data,
        dto: MediaDTO,
        status: HttpStatus.Created,
      });
    }

    return this.response(res, {
      data: ResponseHelper.error(HttpException.UNPROCESSABLE_ENTITY, {
        errors: { format: i18n()['validate.file.format'] },
      }),
      status: HttpStatus.UnprocessableEntity,
    });
  }
}
