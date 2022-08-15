/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SelectQueryBuilder } from 'typeorm';

import { RepositoryCore } from '@core';
import { i18n } from '@lib';
import { LIMIT_ITEM } from '@utils';
import { SqlHelper } from '@utils/helpers';

import { UserEntity } from './entity';
import { IUserRepository } from './interface';
import { FullUser, User, UserOption } from './user.type';

export default class UserRepository
  extends RepositoryCore<UserEntity>
  implements IUserRepository
{
  constructor() {
    super(UserEntity, 'u');

    this.notFound = i18n()['notFound.user'];
  }

  async countByQuery(
    options: Pick<UserOption, 'relations' | 'where'>,
  ): Promise<number> {
    try {
      const queryBuilder = this.orm.createQueryBuilder(this.alias);

      this.buildRelation(options, queryBuilder);
      this.buildWhere(options, queryBuilder);

      return await queryBuilder.getCount();
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async create(body: User): Promise<Pick<FullUser, 'id' | 'email'>> {
    try {
      const userEntity = this.orm.create(body);

      await this.orm.save(userEntity);

      return { id: userEntity.id, email: userEntity.email };
    } catch (err) {
      throw this.handleError(err);
    }
  }

  findByQuery(options: UserOption): Promise<FullUser[]> {
    try {
      const queryBuilder = this.orm.createQueryBuilder(this.alias);

      this.buildRelation(options, queryBuilder);
      this.buildWhere(options, queryBuilder);
      this.buildOrder(options, queryBuilder);

      if (options?.skip) {
        queryBuilder.skip(options.skip);
      }

      return queryBuilder.take(options?.take || LIMIT_ITEM).getMany();
    } catch (err) {
      throw this.handleError(err);
    }
  }

  findOne(options: UserOption): Promise<FullUser | null> {
    try {
      const queryBuilder = this.orm.createQueryBuilder(this.alias);

      this.buildRelation(options, queryBuilder);
      this.buildWhere(options, queryBuilder);

      return queryBuilder.getOne();
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async findOneOrFail(options: UserOption): Promise<FullUser> {
    try {
      const queryBuilder = this.orm.createQueryBuilder(this.alias);

      this.buildRelation(options, queryBuilder);
      this.buildWhere(options, queryBuilder);

      return await queryBuilder.getOneOrFail();
    } catch (err) {
      throw this.handleError(err);
    }
  }

  async update(entity: UserEntity, body: Partial<User>): Promise<void> {
    try {
      this.orm.merge(entity, body);
      await this.orm.save(entity);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  private buildRelation(
    { relations }: Pick<UserOption, 'relations'>,
    queryBuilder: SelectQueryBuilder<UserEntity>,
  ) {
    if (relations) {
      for (const relation of relations) {
        queryBuilder.leftJoinAndSelect(`${this.alias}.${relation}`, relation);
      }
    }
  }

  private buildWhere(
    { where, relations }: Pick<UserOption, 'relations' | 'where'>,
    queryBuilder: SelectQueryBuilder<UserEntity>,
  ) {
    if (where) {
      for (const key in where) {
        if ({}.hasOwnProperty.call(where, key)) {
          switch (key) {
            case 'createdAt':
              SqlHelper.range({
                alias: this.alias,
                key,
                queryBuilder,
                range: where[key],
                type: 'date',
              });
              break;
            case 'search':
              queryBuilder.andWhere(
                `
                (
                  ${
                    relations?.includes('profile')
                      ? `CONCAT(profile."firstName", ' ', profile."lastName") ILIKE :${key} OR`
                      : ''
                  }
                  ${this.alias}.email ILIKE :${key}
                )
              `,
                { [key]: `%${where[key]}%` },
              );
              break;
            case 'email':
              queryBuilder.andWhere(`LOWER(${this.alias}."${key}") = :${key}`, {
                [key]: where[key],
              });
              break;
            default:
              queryBuilder.andWhere(`${this.alias}."${key}" = :${key}`, {
                [key]: where[key],
              });
          }
        }
      }
    }
  }
}
