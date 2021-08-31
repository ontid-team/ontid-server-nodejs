import { IProfile, IUser } from './interface';

export type User = IUser;
export type FullUser = Id & User & DateInfo;

export type Profile = IProfile;
export type FullProfile = Id & Profile & DateInfo;
