import { container } from 'tsyringe';

import { IMediaService } from './interface';
import MediaService from './media.service';

container.register<IMediaService>('MediaService', MediaService);
