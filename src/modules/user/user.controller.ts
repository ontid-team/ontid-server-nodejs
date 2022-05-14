import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { ControllerCore } from '@core';
import { FilterCtx } from '@utils';

import { UserDTO } from './dto';
import { IUserService } from './interface';
import { FullUser } from './user.type';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: user
 */
@injectable()
export default class UserController extends ControllerCore {
  constructor(
    @inject('UserService') private readonly userService: IUserService,
  ) {
    super();
  }

  /**
   * @openapi
   * /api/users:
   *   get:
   *      tags: [User]
   *      description: Get list user
   *      parameters:
   *        - $ref: '#/components/parameters/LimitParam'
   *        - $ref: '#/components/parameters/PageParam'
   *        - $ref: '#/components/parameters/SortByIdParam'
   *        - $ref: '#/components/parameters/SortByFullName'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/UserListResponse'
   */
  async getList(
    req: Request<any, any, any, FilterCtx<FullUser>>,
    res: Response,
  ) {
    const { filter } = req.query;
    const { page, limit } = req.ctx.pagination;

    const [data, count] = await Promise.all([
      this.userService.getList(filter, req.ctx),
      this.userService.count(filter),
    ]);

    this.response(res, { data, dto: UserDTO, page: { page, limit, count } });
  }

  /**
   * @openapi
   * /api/users/{id}:
   *   get:
   *      tags: [User]
   *      description: Get one user
   *      parameters:
   *        - $ref: '#/components/parameters/IdParam'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/UserOneResponse'
   */
  async getOne(req: Request<Id>, res: Response) {
    const { id } = req.params;

    const data = await this.userService.getOne({ id });

    this.response(res, { data, dto: UserDTO });
  }
}
