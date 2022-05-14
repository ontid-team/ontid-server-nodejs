/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

import { RepositoryCore } from '@core';
import { LIMIT_ITEM } from '@utils';
import { SqlHelper } from '@utils/helpers';

import { UserEntity } from './entity';
import { FindUserOption } from './user.type';

@EntityRepository(UserEntity)
export default class UserRepository extends RepositoryCore<UserEntity> {
  async countByQuery(
    options: Pick<FindUserOption, 'relations' | 'where'>,
  ): Promise<number> {
    const alias = 'u';
    const queryBuilder = this.createQueryBuilder(alias);

    this.buildRelation({ ...options, alias }, queryBuilder);
    this.buildWhere({ ...options, alias }, queryBuilder);

    return queryBuilder.getCount();
  }

  async findListUser(
    options: Omit<FindUserOption, 'alias'>,
  ): Promise<UserEntity[]> {
    const { skip, take } = options;
    const alias = 'u';
    const queryBuilder = this.createQueryBuilder(alias);

    this.buildRelation({ ...options, alias }, queryBuilder);
    this.buildWhere({ ...options, alias }, queryBuilder);
    this.buildOrder({ ...options, alias }, queryBuilder);

    if (skip) {
      queryBuilder.skip(skip);
    }

    return queryBuilder.take(take || LIMIT_ITEM).getMany();
  }

  async findOneUserOrFail(
    options: Omit<FindUserOption, 'alias'>,
  ): Promise<UserEntity> {
    const alias = 'u';
    const queryBuilder = this.createQueryBuilder(alias);

    this.buildRelation({ ...options, alias }, queryBuilder);
    this.buildWhere({ ...options, alias }, queryBuilder);

    return queryBuilder.getOneOrFail();
  }

  private buildOrder(
    {
      relations,
      order,
      alias,
    }: Pick<FindUserOption, 'relations' | 'order' | 'alias'>,
    queryBuilder: SelectQueryBuilder<UserEntity>,
  ) {
    if (order) {
      for (const key in order) {
        if ({}.hasOwnProperty.call(order, key)) {
          switch (key) {
            case 'fullName':
              if (relations?.includes('profile')) {
                queryBuilder
                  .addOrderBy('profile.firstName', order[key])
                  .addOrderBy('profile.lastName', order[key]);
              }
              break;
            default:
              queryBuilder.addOrderBy(
                `${alias}.${key}`,
                order[key],
                'NULLS LAST',
              );
              break;
          }
        }
      }
    }
  }

  private buildRelation(
    { relations, alias }: Pick<FindUserOption, 'relations' | 'alias'>,
    queryBuilder: SelectQueryBuilder<UserEntity>,
  ) {
    if (relations) {
      for (const relation of relations) {
        queryBuilder.leftJoinAndSelect(`${alias}.${relation}`, relation);
      }
    }
  }

  private buildWhere(
    {
      where,
      relations,
      alias,
    }: Pick<FindUserOption, 'relations' | 'where' | 'alias'>,
    queryBuilder: SelectQueryBuilder<UserEntity>,
  ) {
    if (where) {
      for (const key in where) {
        if ({}.hasOwnProperty.call(where, key)) {
          switch (key) {
            case 'createdAt':
              SqlHelper.range({
                alias,
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
                  ${alias}.email ILIKE :${key}
                )
              `,
                { [key]: `%${where[key]}%` },
              );
              break;
            case 'email':
              queryBuilder.andWhere(`LOWER(${alias}."${key}") = :${key}`, {
                [key]: where[key],
              });
              break;
            default:
              queryBuilder.andWhere(`${alias}."${key}" = :${key}`, {
                [key]: where[key],
              });
          }
        }
      }
    }
  }
}
