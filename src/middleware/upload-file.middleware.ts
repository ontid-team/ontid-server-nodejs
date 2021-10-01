import { Request, RequestHandler } from 'express';
import mime from 'mime';
import multer, { Multer, StorageEngine, FileFilterCallback } from 'multer';

import { MediaConfig } from '@config/index';
import { MiddlewareCore } from '@core/index';
import {
  MAX_SIZE_IMAGE_MB,
  getHashName,
  responseError,
  HttpExceptionType,
} from '@utils/index';

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
        const name = `${getHashName(
          file.originalname,
        )}-${Date.now()}.${mime.getExtension(file.mimetype)}`.toLowerCase();

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
      let error = responseError(HttpExceptionType.FILE_FORMAT);

      if (/^(image)\//.test(file.mimetype)) {
        if (fileSize <= MAX_SIZE_IMAGE_MB * 1024 * 1024) {
          cb(null, true);

          return;
        }
        error = responseError(HttpExceptionType.LIMIT_FILE_IMAGE_SIZE);
      }

      cb(error);
    };
  }

  /**
   * Handler
   *
   * @returns {Function}
   */
  handler(path = 'file'): RequestHandler {
    return this.upload.single(path);
  }
}

export default new UploadFileMiddleware();
