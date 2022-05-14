import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

import { DB_TABLE_USER, DB_TABLE_MEDIA, Role, DB_UQ_USER_EMAIL } from '@utils';

export class User1614755512269 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_USER);
  }

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
            isNullable: true,
          },
          {
            name: 'role',
            type: 'enum',
            enum: Object.values(Role),
            default: `'${Role.USER}'`,
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
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraints(DB_TABLE_USER, [
      new TableUnique({
        name: DB_UQ_USER_EMAIL,
        columnNames: ['email'],
      }),
    ]);

    await queryRunner.createForeignKeys(DB_TABLE_USER, [
      new TableForeignKey({
        columnNames: ['avatarId'],
        referencedColumnNames: ['id'],
        referencedTableName: DB_TABLE_MEDIA,
        onDelete: 'SET NULL',
      }),
    ]);
  }
}
