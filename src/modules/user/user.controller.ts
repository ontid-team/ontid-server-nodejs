import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { ControllerCore } from '@core';
import { FilterCtx } from '@utils';

import { UserDTO } from './dto';
import { IUserService } from './interface';
import { FullUser, UserInject } from './user.type';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: user
 */
@injectable()
export default class UserController extends ControllerCore {
  constructor(
    @inject(UserInject.USER_SERVICE) private readonly userService: IUserService,
  ) {
    super();
  }

  /**
   * @openapi
   * /api/users:
   *   get:
   *      tags: [User]
   *      description: Show all users
   *      parameters:
   *        - $ref: '#/components/parameters/LimitParam'
   *        - $ref: '#/components/parameters/PageParam'
   *        - $ref: '#/components/parameters/SortByIdParam'
   *        - $ref: '#/components/parameters/SortByCreatedAtParam'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/UserListResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorized'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
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
   *      description: Show one user
   *      parameters:
   *        - $ref: '#/components/parameters/IdParam'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/UserOneResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorized'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async getOne(req: Request<Id>, res: Response) {
    const { id } = req.params;

    const data = await this.userService.getOne({ id });

    this.response(res, { data, dto: UserDTO });
  }
}
