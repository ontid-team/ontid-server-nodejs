import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';
import { OptionCtx } from '@utils/index';

import { IUserService } from './interface';
import UserRepository from './user.repository';
import { FullUser } from './user.type';

export default class UserService extends ServiceCore implements IUserService {
  readonly repository: UserRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(UserRepository);
  }

  async getList(params: Context) {
    const { limit, skip } = params.pagination;

    const options: OptionCtx<FullUser> = {
      skip,
      take: limit,
    };

    return (await this.repository.findEntityList(options)) as FullUser[];
  }

  async getOne(query: Partial<FullUser>) {
    const options: OptionCtx<FullUser> = {
      where: query,
    };

    return (await this.repository.findEntityOneOrFail(options)) as FullUser;
  }

  async count() {
    return this.repository.count();
  }
}
