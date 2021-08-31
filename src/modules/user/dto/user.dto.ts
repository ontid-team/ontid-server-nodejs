import { Exclude, Type, Expose } from 'class-transformer';

import { MediaDTO } from '@modules/media';
import { Role } from '@utils/index';

import { ProfileDTO } from './profile.dto';

@Exclude()
export class UserDTO {
  @Expose()
  id!: number;

  @Expose()
  email!: string;

  @Expose()
  role!: Role;

  @Expose()
  isNotifyEmail!: boolean;

  @Expose()
  @Type(() => ProfileDTO)
  profile!: ProfileDTO;

  @Expose()
  @Type(() => MediaDTO)
  avatar!: MediaDTO;
}
