import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core/index';

import { MediaEntity } from './entity';
import { Media } from './media.type';

@EntityRepository(MediaEntity)
export default class MediaRepository extends RepositoryCore<MediaEntity> {
  async createMedia(body: Media): Promise<MediaEntity> {
    return this.insertEntityOne(body, MediaEntity);
  }
}
