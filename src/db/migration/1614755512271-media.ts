import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

import { DB_TABLE_MEDIA, DB_TABLE_USER } from '@utils';

export class Media1629959489270 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_MEDIA);
  }

  async up(queryRunner: QueryRunner): Promise<void> {
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
            name: 'thumbnailPath',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'path',
            type: 'text',
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
            name: 'createdById',
            type: 'int',
          },
          {
            name: 'updatedById',
            type: 'int',
            isNullable: true,
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
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys(DB_TABLE_MEDIA, [
      new TableForeignKey({
        columnNames: ['createdById'],
        referencedColumnNames: ['id'],
        referencedTableName: DB_TABLE_USER,
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['updatedById'],
        referencedColumnNames: ['id'],
        referencedTableName: DB_TABLE_USER,
        onDelete: 'SET NULL',
      }),
    ]);

    await queryRunner.createIndices(DB_TABLE_MEDIA, [
      new TableIndex({ columnNames: ['createdAt'] }),
    ]);
  }
}
