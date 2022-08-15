import { Exclude, Expose, Type } from 'class-transformer';

import { MediaDTO } from '@modules/media';
import { Role } from '@utils';

import { ProfileDTO } from './profile.dto';

@Exclude()
export class UserDTO {
  @Expose()
  @Type(() => MediaDTO)
  avatar!: MediaDTO;

  @Expose()
  email!: string;

  @Expose()
  id!: number;

  @Expose()
  isNotifyEmail!: boolean;

  @Expose()
  @Type(() => ProfileDTO)
  profile!: ProfileDTO;

  @Expose()
  role!: Role;
}
