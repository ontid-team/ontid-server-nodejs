import { FindManyOptions } from 'typeorm';

import { IProfile, IUser } from './interface';

export type Profile = IProfile;
export type User = IUser;

export type FullProfile = Id & Profile & DateInfo;
export type FullUser = Id & User & DateInfo;

export type FindUserOption = Pick<
  FindManyOptions<FullUser>,
  'relations' | 'skip' | 'take'
> & {
  alias: string;
  order?: Pick<FindManyOptions<FullUser>, 'order'>;
  where?: Partial<Omit<FullUser, 'createdAt'>>;
};
