import { IProfile, IUser } from './interface';

export type Profile = IProfile;
export type FullProfile = Id & Profile & DateInfo;

export type User = IUser;
export type FullUser = Id & User & { profile: FullProfile } & DateInfo;
