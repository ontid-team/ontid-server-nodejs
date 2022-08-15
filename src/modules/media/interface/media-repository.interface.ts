import { FullMedia, Media } from '../media.type';

export interface IMediaRepository {
  create(body: Media): Promise<FullMedia>;
}
