import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';

import { MediaDTO } from './dto';
import { IMediaService } from './interface';
import MediaRepository from './media.repository';
import { Media } from './media.type';

export default class MediaService extends ServiceCore implements IMediaService {
  readonly repository: MediaRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(MediaRepository);
  }

  async create(body: Media) {
    const mediaFromDB = await this.repository.createMedia(body);

    return this.response(MediaDTO, mediaFromDB);
  }
}
