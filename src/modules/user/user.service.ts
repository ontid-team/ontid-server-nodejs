import { injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core';

import { IUserService } from './interface';
import UserRepository from './user.repository';
import { FullUser } from './user.type';

@injectable()
export default class UserService extends ServiceCore implements IUserService {
  readonly repository: UserRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(UserRepository);
  }

  async count(query: Partial<FullUser>) {
    return this.repository.countByQuery({ where: query });
  }

  getList(query: Partial<FullUser>, { pagination: { limit, skip } }: Context) {
    return this.repository.findListUser({ where: query, skip, take: limit });
  }

  getOne(query: Partial<FullUser>) {
    return this.repository.findEntityOneOrFail({ where: query });
  }
}
