import { Entity, Column } from 'typeorm';

import { EntityCore } from '@core/index';
import { DB_TABLE_MEDIA, generateStorage } from '@utils/index';

import { IMedia } from '../interface';

@Entity({
  name: DB_TABLE_MEDIA,
})
export default class MediaEntity extends EntityCore<IMedia> implements IMedia {
  @Column('varchar', { nullable: true })
  name!: string;

  @Column('text')
  path!: string;

  @Column('text', { nullable: true })
  thumbnailPath!: string;

  @Column('varchar', { nullable: true })
  mimeType!: string;

  @Column('int', { nullable: true })
  size!: number;

  get url() {
    return generateStorage(this.path);
  }

  get thumbnailUrl() {
    return generateStorage(this.thumbnailPath);
  }
}
