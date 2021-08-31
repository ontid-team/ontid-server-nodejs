/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import faker from 'faker';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { IMedia, MediaEntity } from '@modules/media';
import { UserEntity, ProfileEntity } from '@modules/user';
import { DEFAULT_SEED_DATA } from '@utils/index';

export default class User implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    for (let i = 1; i <= DEFAULT_SEED_DATA; i++) {
      const gender = faker.helpers.randomize([0, 1]);
      const imageName = faker.helpers.randomize([
        'photo1',
        'photo2',
        'photo3',
        'photo4',
        'photo5',
      ]);

      const avatarFromDB = (await connection
        .createQueryBuilder()
        .select('*')
        .from(MediaEntity, 'm')
        .where('m.name = :imageName', { imageName })
        .orderBy('RANDOM()')
        .limit(1)
        .execute()) as unknown as IMedia;

      const user = new UserEntity({
        email: faker.internet.email(),
        avatar: avatarFromDB[0],
        isConfirmedEmail: true,
        isActive: true,
      });

      const userFromDB = await connection.getRepository(UserEntity).save(user);

      const profile = new ProfileEntity({
        userId: userFromDB.id,
        firstName: faker.name.firstName(gender),
        lastName: faker.name.lastName(gender),
        birthday: faker.date.past().toUTCString(),
        about: faker.lorem.paragraph(),
      });

      await connection.getRepository(ProfileEntity).save(profile);
    }
  }
}
