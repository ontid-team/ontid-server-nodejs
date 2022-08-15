import { IMedia } from './interface';

export enum MediaInject {
  MEDIA_REPOSITORY = 'MediaRepository',
  MEDIA_SERVICE = 'MediaService',
}

export type Media = IMedia;
export type FullMedia = Id & Media & DateInfo;
