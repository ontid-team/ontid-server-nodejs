import { RepositoryCore } from '@core';

import { MediaEntity } from './entity';
import { IMediaRepository } from './interface';
import { FullMedia, Media } from './media.type';

export default class MediaRepository
  extends RepositoryCore<MediaEntity>
  implements IMediaRepository
{
  constructor() {
    super(MediaEntity, 'm');
  }

  async create(body: Media): Promise<FullMedia> {
    try {
      const mediaEntity = this.orm.create(body);

      return await this.orm.save(mediaEntity);
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
