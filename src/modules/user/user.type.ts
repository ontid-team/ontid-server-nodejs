import { FindManyOptions } from 'typeorm';

import { IProfile, IUser } from './interface';

export enum UserInject {
  USER_REPOSITORY = 'UserRepository',
  USER_SERVICE = 'UserService',
}

export type Profile = IProfile;
export type User = IUser;

export type FullProfile = Id & Profile & DateInfo;
export type FullUser = Id & User & DateInfo;

export type UserOption = Pick<
  FindManyOptions<FullUser>,
  'skip' | 'take' | 'order'
> & {
  relations?: string[];
  where?: Partial<Omit<FullUser, 'createdAt'>>;
};
