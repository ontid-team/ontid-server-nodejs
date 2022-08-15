import { Request, RequestHandler } from 'express';
import mime from 'mime';
import multer, { FileFilterCallback, Multer, StorageEngine } from 'multer';

import { MediaConfig } from '@config';
import { MiddlewareCore } from '@core';
import { i18n } from '@lib';
import { FileName, HttpException, MAX_SIZE_IMAGE_MB } from '@utils';
import { FolderHelper, ResponseHelper, StringHelper } from '@utils/helpers';

class UploadFileMiddleware extends MiddlewareCore {
  protected upload: Multer;

  constructor() {
    super();

    this.upload = multer({
      storage: this.diskStorage,
      fileFilter: this.fileFilter,
    });
  }

  private get diskStorage(): StorageEngine {
    return multer.diskStorage({
      destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void,
      ) => {
        cb(null, MediaConfig.imgPathFolder);
      },
      filename: (_req: Request, file, cb) => {
        const name = `${FolderHelper.getHashName(
          file.originalname,
        )}-${Date.now()}.${
          mime.getExtension(file.mimetype) || ''
        }`.toLowerCase();

        cb(null, name);
      },
    });
  }

  private get fileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      const fileSize = req.headers['content-length'] || 0;
      let errors: { [key: string]: string } = {
        format: i18n()['validate.file.format'],
      };

      if (
        /(jpg|jpeg|png)/g.test(file.mimetype) &&
        FileName.IMAGE === file.fieldname
      ) {
        if (fileSize <= MAX_SIZE_IMAGE_MB * 1024 * 1024) {
          cb(null, true);

          return;
        }
        errors = {
          limit: StringHelper.replate(i18n()['validate.file.limitImage'], {
            size: MAX_SIZE_IMAGE_MB,
          }),
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      cb(ResponseHelper.error(HttpException.UNPROCESSABLE_ENTITY, errors));
    };
  }

  /**
   * Handler
   *
   * @returns {Function}
   */
  handler(): RequestHandler {
    return this.upload.any();
  }
}

export default new UploadFileMiddleware();
