import { EntityRepository } from 'typeorm';

import { RepositoryCore } from '@core';

import { MediaEntity } from './entity';
import { Media, FullMedia } from './media.type';

@EntityRepository(MediaEntity)
export default class MediaRepository extends RepositoryCore<MediaEntity> {
  createMedia(body: Media): Promise<FullMedia> {
    return this.insertEntityOne(body, MediaEntity) as Promise<FullMedia>;
  }
}
