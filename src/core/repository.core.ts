import { Repository, FindConditions, DeepPartial, ObjectType } from 'typeorm';

import { OptionCtx } from '@utils/index';

export default class RepositoryCore<T> extends Repository<T> {
  async findEntityList(options: OptionCtx<T> = {}): Promise<T[]> {
    return this.find(options);
  }

  async findEntityOneOrFail(options: OptionCtx<T> = {}): Promise<T> {
    return this.findOneOrFail(options);
  }

  protected async insertEntityMany<E = T>(
    entities: DeepPartial<E>[],
    into: ObjectType<E>,
  ): Promise<E[]> {
    return (
      await this.createQueryBuilder()
        .insert()
        .into(into)
        .values(entities)
        .returning('*')
        .execute()
    ).generatedMaps as E[];
  }

  protected async insertEntityOne<E = T>(
    entities: DeepPartial<E>,
    into: ObjectType<E>,
  ): Promise<E> {
    return (
      await this.createQueryBuilder()
        .insert()
        .into(into)
        .values(entities)
        .returning('*')
        .execute()
    ).generatedMaps[0] as E;
  }

  async deleteEntity(query: FindConditions<T>): Promise<void> {
    await this.delete(query);
  }
}
