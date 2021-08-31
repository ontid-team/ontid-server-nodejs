import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';
import { OptionCtx } from '@utils/index';

import { UserDTO } from './dto';
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
    const { page, limit, skip } = params.pagination;

    const options: OptionCtx<FullUser> = {
      skip,
      take: limit,
    };

    const [usersFromDB, count] = await Promise.all([
      this.repository.findEntityList(options),
      this.repository.count(),
    ]);

    return this.response(UserDTO, usersFromDB, {
      page: { page, limit, count },
    });
  }

  async getOne(query: Partial<FullUser>) {
    const options: OptionCtx<FullUser> = {
      where: query,
    };
    const userFromDB = await this.repository.findEntityOneOrFail(options);

    return this.response(UserDTO, userFromDB);
  }
}
