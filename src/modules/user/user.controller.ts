import AutoBind from 'auto-bind';
import { Request, Response } from 'express';

import { ControllerCore } from '@core/index';

import { UserDTO } from './dto';
import { IUserService } from './interface';

/**
 * @swagger
 * tags:
 *   name: User
 *   description: user
 */
export default class UserController extends ControllerCore {
  constructor(private readonly service: IUserService) {
    super();

    this.init();
    AutoBind(this);
  }

  /**
   * @openapi
   * /api/users:
   *   get:
   *      tags: [User]
   *      description: Get list user
   *      parameters:
   *        - in: query
   *          name: limit
   *          description: The numbers of items to return
   *          schema:
   *            type: integer
   *        - in: query
   *          name: page
   *          description: The page number
   *          schema:
   *            type: integer
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  data:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/UserResponse'
   *                  meta:
   *                    $ref: '#/components/schemas/Meta'
   */
  async getList(req: Request, res: Response) {
    const [userFromService, page] = await Promise.all([
      this.service.getList(req.ctx),
      this.service.count(req.ctx),
    ]);

    res.json(this.response(UserDTO, userFromService, { page }));
  }

  /**
   * @openapi
   * /api/users/{id}:
   *   get:
   *      tags: [User]
   *      description: Get one user
   *      parameters:
   *        - name: id
   *          in: path
   *          description: "ID of user to return"
   *          required: true
   *          schema:
   *            type: integer
   *            format: int64
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  data:
   *                    $ref: '#/components/schemas/UserResponse'
   */
  async getOne(req: Request<Id>, res: Response) {
    const { id } = req.params;

    const data = await this.service.getOne({ id });

    res.json(this.response(UserDTO, data));
  }
}
