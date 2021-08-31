import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MediaDTO {
  @Expose()
  id!: number;

  @Expose()
  url!: string;

  @Expose()
  thumbnailUrl!: number;
}
