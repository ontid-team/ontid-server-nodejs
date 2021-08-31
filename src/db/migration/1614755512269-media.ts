import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_MEDIA } from '@utils/index';

export class media1614755512269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_MEDIA,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'path',
            type: 'text',
          },
          {
            name: 'thumbnailPath',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'size',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'mimeType',
            type: 'varchar',
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_MEDIA);
  }
}
