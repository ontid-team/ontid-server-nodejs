import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';

import { IMediaService } from './interface';
import MediaRepository from './media.repository';
import { FullMedia, Media } from './media.type';

export default class MediaService extends ServiceCore implements IMediaService {
  readonly repository: MediaRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(MediaRepository);
  }

  async create(body: Media) {
    return (await this.repository.createMedia(body)) as FullMedia;
  }
}
