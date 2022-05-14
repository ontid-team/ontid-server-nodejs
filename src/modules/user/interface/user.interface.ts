import type { FullMedia } from '@modules/media';
import { Role } from '@utils';

import { IProfile } from './profile.interface';

export interface IUser {
  avatar?: FullMedia;
  email: string;
  isActive: boolean;
  isConfirmedEmail: boolean;
  isNotifyEmail: boolean;
  profile?: IProfile;
  role: Role;
}
