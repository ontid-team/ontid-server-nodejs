import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { MediaEntity } from '@modules/media';

import MediaData from './seed-data/media.json';

export default class Media implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection.createQueryBuilder().delete().from(MediaEntity).execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(MediaEntity)
      .values(MediaData)
      .execute();
  }
}
