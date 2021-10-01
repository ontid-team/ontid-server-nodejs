import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { EntityCore } from '@core/index';
import { MediaEntity } from '@modules/media';
import { DB_TABLE_USER, Role } from '@utils/index';

import { IUser } from '../interface';

import ProfileEntity from './profile.entity';

@Entity({
  name: DB_TABLE_USER,
})
export default class UserEntity extends EntityCore<IUser> implements IUser {
  @Column('int', { nullable: true })
  avatarId!: number;

  @ManyToOne(() => MediaEntity, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'avatarId' })
  avatar!: MediaEntity;

  @Column('varchar', { unique: true })
  email!: string;

  @Column('enum', {
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @Column('bool', { default: false })
  isNotifyEmail = false;

  @Column('bool', { default: false })
  isConfirmedEmail = false;

  @Column('bool', { default: true })
  isActive = true;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { eager: true })
  profile!: ProfileEntity;
}
