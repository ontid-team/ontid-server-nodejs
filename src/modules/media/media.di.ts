import { container } from 'tsyringe';

import { IMediaRepository, IMediaService } from './interface';
import MediaRepository from './media.repository';
import MediaService from './media.service';
import { MediaInject } from './media.type';

container.register<IMediaService>(MediaInject.MEDIA_SERVICE, MediaService);
container.register<IMediaRepository>(
  MediaInject.MEDIA_REPOSITORY,
  MediaRepository,
);
