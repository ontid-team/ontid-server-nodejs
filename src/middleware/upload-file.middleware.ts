import { RequestHandler, Request } from 'express';
import mime from 'mime';
import multer, { Multer, StorageEngine, FileFilterCallback } from 'multer';

import { MediaConfig } from '@config/index';
import { MiddlewareCore } from '@core/index';
import { MAX_SIZE_MB, getHashName } from '@utils/index';

class UploadFileMiddleware extends MiddlewareCore {
  protected upload: Multer;

  constructor() {
    super();

    this.upload = multer({
      storage: this.diskStorage,
      limits: {
        fileSize: MAX_SIZE_MB * 1024 * 1024,
      },
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
      _req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      if (/^image\//.test(file.mimetype)) {
        cb(null, true);

        return;
      }

      cb(new Error('Wrong file type'));
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
