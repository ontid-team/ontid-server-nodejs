import { Entity, Column } from 'typeorm';

import { EntityCore } from '@core';
import { DB_TABLE_MEDIA } from '@utils';
import { FolderHelper } from '@utils/helpers';

import { IMedia } from '../interface';

@Entity({
  name: DB_TABLE_MEDIA,
})
export default class MediaEntity extends EntityCore<IMedia> implements IMedia {
  @Column('varchar', { nullable: true })
  mimeType!: string;

  @Column('varchar', { nullable: true })
  name!: string;

  @Column('text')
  path!: string;

  @Column('int', { nullable: true })
  size!: number;

  @Column('text', { nullable: true })
  thumbnailPath!: string;

  get thumbnailUrl() {
    return FolderHelper.generateStorage(this.thumbnailPath);
  }

  get url() {
    return FolderHelper.generateStorage(this.path);
  }
}
