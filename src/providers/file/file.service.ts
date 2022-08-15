/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import fs from 'fs/promises';
import path from 'path';

import imageThumbnail from 'image-thumbnail';
import { singleton } from 'tsyringe';

import { MediaConfig } from '@config';
import { ServiceCore } from '@core';
import {
  HttpException,
  IMG_HEIGHT_THUMBNAIL,
  IMG_WIDTH_THUMBNAIL,
} from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { IFileService } from './interface';

@singleton()
export default class FileService extends ServiceCore implements IFileService {
  constructor() {
    super();

    this.init();
  }

  async uploadThumbnail(file: string): Promise<string> {
    try {
      const { ext, name } = path.parse(file);
      const nameThumbnail = `${name}_thumbnail${ext}`;
      const pathFile = path.join(MediaConfig.imgPathFolder, file);
      const pathThumbnailFile = path.join(
        MediaConfig.imgPathFolder,
        nameThumbnail,
      );

      const thumbnail = await imageThumbnail(pathFile, {
        responseType: 'buffer',
        width: IMG_WIDTH_THUMBNAIL,
        height: IMG_HEIGHT_THUMBNAIL,
      });

      await fs.writeFile(pathThumbnailFile, thumbnail);

      return nameThumbnail;
    } catch (err) {
      this.handleError(err);

      throw ResponseHelper.error(HttpException.SERVER_ERROR);
    }
  }
}
