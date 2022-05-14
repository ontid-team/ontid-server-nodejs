import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core';

import { IMediaService } from './interface';
import MediaRepository from './media.repository';
import { Media } from './media.type';

@injectable()
export default class MediaService extends ServiceCore implements IMediaService {
  readonly repository: MediaRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(MediaRepository);
  }

  create(body: Media) {
    return this.repository.createMedia(body);
  }
}
