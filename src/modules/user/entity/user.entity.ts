import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  DeleteDateColumn,
  Unique,
} from 'typeorm';

import { EntityCore } from '@core';
import { MediaEntity } from '@modules/media';
import { DB_TABLE_USER, DB_UQ_USER_EMAIL, Role } from '@utils';

import { IUser } from '../interface';

import ProfileEntity from './profile.entity';

@Entity({ name: DB_TABLE_USER })
@Unique(DB_UQ_USER_EMAIL, ['email'])
export default class UserEntity extends EntityCore<IUser> implements IUser {
  @ManyToOne(() => MediaEntity, {
    onDelete: 'SET NULL',
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'avatarId' })
  avatar!: MediaEntity;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;

  @Column('varchar', {
    nullable: true,
    transformer: {
      to(value: string | null) {
        return !value ? null : String(value).trim().toLowerCase();
      },
      from(value: string | null) {
        return value;
      },
    },
  })
  email!: string;

  @Column('bool', { default: true })
  isActive = true;

  @Column('bool', { default: false })
  isConfirmedEmail = false;

  @Column('bool', { default: true })
  isNotifyEmail = true;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  profile!: ProfileEntity;

  @Column('enum', { enum: Role, default: Role.USER })
  role = Role.USER;
}
