import { FullUser, User, UserOption } from '../user.type';

export interface IUserRepository {
  countByQuery(options: UserOption): Promise<number>;
  create(body: User): Promise<Pick<FullUser, 'id' | 'email'>>;
  findByQuery(options: UserOption): Promise<FullUser[]>;
  findOne(options: UserOption): Promise<FullUser | null>;
  findOneOrFail(options: UserOption): Promise<FullUser>;
  update(entity: Partial<FullUser>, body: Partial<User>): Promise<void>;
}
