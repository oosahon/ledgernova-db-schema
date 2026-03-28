import { MigrationBuilder } from 'node-pg-migrate';
import { USERS_TABLE, CATEGORIES_TABLE as TABLE } from '../definitions/tables';
import {
  CATEGORY_STATUS_NAME,
  ACCOUNTING_DOMAIN_NAME,
  CATEGORY_TYPE_NAME,
} from '../definitions/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    TABLE,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      name: { type: 'varchar(100)', notNull: true },

      accounting_domain: { type: ACCOUNTING_DOMAIN_NAME, notNull: true },

      type: { type: CATEGORY_TYPE_NAME, notNull: true },

      tax_key: { type: 'varchar(250)', notNull: true },

      status: {
        type: CATEGORY_STATUS_NAME,
        notNull: true,
        default: 'active',
      },

      description: { type: 'varchar(200)', notNull: true },

      parent_id: {
        type: 'uuid',
        references: TABLE,
        onDelete: 'RESTRICT',
      },

      created_by: {
        type: 'uuid',
        references: USERS_TABLE,
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

  pgm.createIndex(TABLE, 'created_by');

  pgm.sql(`
    ALTER TABLE "${TABLE.schema}"."${TABLE.name}" 
    ADD CONSTRAINT "unique_creator_tax_name" 
    UNIQUE NULLS NOT DISTINCT (created_by, tax_key, name);
  `);

  pgm.createIndex(TABLE, 'parent_id');
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
