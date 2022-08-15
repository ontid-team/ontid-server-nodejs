import { FullUser } from '../user.type';

export interface IUserService {
  count(query: Partial<FullUser>): Promise<number>;
  getList(query: Partial<FullUser>, ctx: Context): Promise<FullUser[]>;
  getOne(query: Partial<FullUser>): Promise<FullUser>;
}
