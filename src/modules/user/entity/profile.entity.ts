import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { EntityCore } from '@core';
import { DB_TABLE_PROFILE } from '@utils';

import { IProfile } from '../interface';

import UserEntity from './user.entity';

@Entity({ name: DB_TABLE_PROFILE })
export default class ProfileEntity
  extends EntityCore<IProfile>
  implements IProfile
{
  @Column('text', { nullable: true })
  about?: string;

  @Column('date', { nullable: true })
  birthday?: string;

  @Column('varchar', { nullable: true })
  firstName?: string;

  @Column('varchar', { nullable: true })
  lastName?: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column('int', { unique: true })
  userId!: number;

  public get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
