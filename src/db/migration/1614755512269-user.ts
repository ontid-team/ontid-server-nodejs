import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { DB_TABLE_USER, DB_TABLE_MEDIA, Role } from '@utils/index';

export class user1614755512269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_USER,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'avatarId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'role',
            type: 'enum',
            enum: Object.values(Role),
            // eslint-disable-next-line quotes
            default: "'user'",
          },
          {
            name: 'isNotifyEmail',
            type: 'bool',
            default: true,
          },
          {
            name: 'isConfirmedEmail',
            type: 'bool',
            default: true,
          },
          {
            name: 'isActive',
            type: 'bool',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      DB_TABLE_USER,
      new TableForeignKey({
        columnNames: ['avatarId'],
        referencedColumnNames: ['id'],
        referencedTableName: DB_TABLE_MEDIA,
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_USER);
  }
}
