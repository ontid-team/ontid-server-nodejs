import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { EntityCore } from '@core/index';
import { DB_TABLE_PROFILE } from '@utils/index';

import { IProfile } from '../interface';

import UserEntity from './user.entity';

@Entity({
  name: DB_TABLE_PROFILE,
})
export default class ProfileEntity
  extends EntityCore<IProfile>
  implements IProfile
{
  @Column('int', { unique: true })
  userId!: number;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column('varchar', { nullable: true })
  firstName?: string;

  @Column('varchar', { nullable: true })
  lastName?: string;

  @Column('date', { nullable: true })
  birthday?: string;

  @Column('text', { nullable: true })
  about?: string;

  public get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
