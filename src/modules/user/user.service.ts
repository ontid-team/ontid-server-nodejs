import { inject, injectable } from 'tsyringe';

import { ServiceCore } from '@core';

import { IUserRepository, IUserService } from './interface';
import { FullUser, UserInject } from './user.type';

@injectable()
export default class UserService extends ServiceCore implements IUserService {
  constructor(
    @inject(UserInject.USER_REPOSITORY)
    private readonly repository: IUserRepository,
  ) {
    super();
  }

  count(query: Partial<FullUser>) {
    return this.repository.countByQuery({ where: query });
  }

  getList(query: Partial<FullUser>, { pagination: { limit, skip } }: Context) {
    return this.repository.findByQuery({ where: query, skip, take: limit });
  }

  getOne(query: Partial<FullUser>) {
    return this.repository.findOneOrFail({ where: query });
  }
}
