import { inject, injectable } from 'tsyringe';

import { ServiceCore } from '@core';
import { FileInject, IFileService } from '@providers/file';
import { FileName } from '@utils';

import { IMediaRepository, IMediaService } from './interface';
import { Media, MediaInject } from './media.type';

@injectable()
export default class MediaService extends ServiceCore implements IMediaService {
  constructor(
    @inject(MediaInject.MEDIA_REPOSITORY)
    private readonly repository: IMediaRepository,
    @inject(FileInject.FILE_SERVICE)
    private readonly fileService: IFileService,
  ) {
    super();
  }

  async create(body: Media, { fieldname }: { fieldname: string }) {
    if (fieldname === FileName.IMAGE) {
      body.thumbnailPath = await this.fileService.uploadThumbnail(body.path);
    }

    return this.repository.create(body);
  }
}
