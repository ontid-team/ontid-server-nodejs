/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import faker from 'faker';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { MediaEntity } from '@modules/media';
import { UserEntity, ProfileEntity } from '@modules/user';
import { DEFAULT_SEED_DATA } from '@utils';

export default class User implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection.createQueryBuilder().delete().from(UserEntity).execute();

    for (let i = 1; i <= DEFAULT_SEED_DATA; i++) {
      const gender = faker.helpers.randomize([0, 1]);

      const avatar = await connection
        .createQueryBuilder()
        .select('m.id')
        .from(MediaEntity, 'm')
        .orderBy('RANDOM()')
        .getOne();

      const user = new UserEntity({
        email: faker.internet.email(),
        isConfirmedEmail: true,
        isActive: true,
      });

      await connection.getRepository(UserEntity).save(user);

      const profile = new ProfileEntity({
        firstName: faker.name.firstName(gender),
        lastName: faker.name.lastName(gender),
        birthday: faker.date.past().toUTCString(),
        about: faker.lorem.paragraph(),
      });

      await connection
        .getRepository(ProfileEntity)
        .save({ ...profile, userId: user.id });

      await connection
        .createQueryBuilder()
        .relation(UserEntity, 'avatar')
        .of(user)
        .set(avatar);
    }
  }
}
