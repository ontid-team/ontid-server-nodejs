import { FullMedia, Media } from '../media.type';

export interface IMediaService {
  create(body: Media): Promise<FullMedia>;
}
