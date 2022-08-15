import { Exclude, Expose, Transform, Type } from 'class-transformer';

import { FolderHelper } from '@utils/helpers';

@Exclude()
export class MediaDTO {
  @Expose()
  id!: number;

  @Expose()
  mimeType!: string;

  @Expose()
  name!: string;

  @Expose()
  @Transform(({ value }: { value?: string }) =>
    FolderHelper.generateStorage(value),
  )
  path!: string;

  @Expose()
  @Type(() => Number)
  size!: number;

  @Expose()
  @Transform(({ value }: { value?: string }) =>
    FolderHelper.generateStorage(value),
  )
  thumbnailPath!: string;
}
