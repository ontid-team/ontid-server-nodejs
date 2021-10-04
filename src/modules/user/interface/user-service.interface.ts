import { FullUser } from '../user.type';

export interface IUserService {
  getList(params: Context): Promise<FullUser[]>;
  getOne(query: Partial<FullUser>): Promise<FullUser>;
  count(): Promise<number>;
}
