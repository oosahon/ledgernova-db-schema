import { MigrationBuilder } from 'node-pg-migrate';
import {
  categoriesTable,
  categoryStatus,
  categoryType,
} from '../config/categories';
import toSchemaString from '../utils/to-schema-string';
import { accountingEntityType } from '../config/accounting';
import { usersTable } from '../config/users';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(categoryStatus, ['active', 'archived']);
  pgm.createType(categoryType, [
    'sale',
    'purchase',
    'credit_note',
    'debit_note',
    'expense',
    'payment',
    'receipt',
  ]);

  pgm.createTable(
    categoriesTable,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      name: { type: 'varchar(100)', notNull: true },

      accounting_entity_type: {
        type: toSchemaString(accountingEntityType),
        notNull: true,
      },

      type: { type: toSchemaString(categoryType), notNull: true },

      tax_key: { type: 'varchar(250)', notNull: true },

      status: {
        type: toSchemaString(categoryStatus),
        notNull: true,
        default: 'active',
      },

      description: { type: 'varchar(200)', notNull: true },

      parent_id: {
        type: 'uuid',
        references: categoriesTable,
        onDelete: 'RESTRICT',
      },

      created_by: {
        type: 'uuid',
        references: usersTable,
        onDelete: 'SET NULL',
      },

      created_at: {
        type: 'timestamptz',
        default: pgm.func('now()'),
        notNull: true,
      },

      updated_at: {
        type: 'timestamptz',
        notNull: true,
        default: pgm.func('now()'),
      },
      deleted_at: { type: 'timestamptz' },
    },
    {
      ifNotExists: true,
    }
  );

  pgm.createIndex(categoriesTable, 'created_by');

  pgm.sql(`
      ALTER TABLE ${toSchemaString(categoriesTable)}
      ADD CONSTRAINT "unique_creator_tax_name" 
      UNIQUE NULLS NOT DISTINCT (created_by, tax_key, name);
    `);

  pgm.createIndex(categoriesTable, 'parent_id');
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(categoriesTable);
  pgm.dropType(categoryStatus);
  pgm.dropType(categoryType);
};
