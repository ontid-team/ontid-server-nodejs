import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MediaDTO {
  @Expose()
  id!: number;

  @Expose()
  mimeType!: string;

  @Expose()
  thumbnailUrl!: number;

  @Expose()
  url!: string;
}
