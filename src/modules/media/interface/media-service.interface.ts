import { MediaDTO } from '../dto';
import { Media } from '../media.type';

export interface IMediaService {
  create(body: Media): Promise<ResponseData<MediaDTO>>;
}
