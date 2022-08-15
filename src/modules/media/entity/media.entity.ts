import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { EntityCore } from '@core';
import { UserEntity } from '@modules/user/entity';
import { DB_TABLE_MEDIA } from '@utils';

import { IMedia } from '../interface';

@Entity({ name: DB_TABLE_MEDIA })
export default class MediaEntity extends EntityCore<IMedia> implements IMedia {
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'createdById' })
  createdBy!: UserEntity;

  @Column('int')
  createdById!: number;

  @Column('varchar', { nullable: true })
  mimeType?: string;

  @Column('varchar', { nullable: true })
  name?: string;

  @Column('text')
  path!: string;

  @Column('int', { nullable: true })
  size?: number;

  @Column('text', { nullable: true })
  thumbnailPath?: string;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updatedById' })
  updatedBy!: UserEntity;

  @Column('int', { nullable: true })
  updatedById!: number;
}
