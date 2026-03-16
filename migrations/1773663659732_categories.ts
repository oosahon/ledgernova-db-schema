import { MigrationBuilder } from 'node-pg-migrate';
import { USERS_TABLE, CATEGORIES_TABLE as TABLE } from '../definitions/tables';
import {
  CATEGORY_FLOW_TYPE,
  CATEGORY_STATUS,
  LEDGER_ACCOUNT_TYPE,
} from '../definitions/types';

const CATEGORY_STATUS_NAME = `"${CATEGORY_STATUS.schema}"."${CATEGORY_STATUS.name}"`;

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(CATEGORY_STATUS, ['active', 'archived']);
  pgm.createType(CATEGORY_FLOW_TYPE, ['in', 'out']);

  pgm.createTable(
    TABLE,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      name: { type: 'varchar(100)', notNull: true },

      ledger_account_type: { type: LEDGER_ACCOUNT_TYPE.name, notNull: true },

      tax_key: { type: 'varchar(250)', notNull: true },

      flow_type: { type: CATEGORY_FLOW_TYPE.name, notNull: true },

      status: {
        type: CATEGORY_STATUS_NAME,
        notNull: true,
        default: 'active',
      },

      description: { type: 'varchar(200)', notNull: true },

      user_id: {
        type: 'uuid',
        references: USERS_TABLE,
        onDelete: 'CASCADE',
      },

      parent_id: {
        type: 'uuid',
        references: TABLE,
        onDelete: 'RESTRICT',
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

  pgm.createIndex(TABLE, 'user_id');

  pgm.sql(`
    ALTER TABLE "${TABLE.schema}"."${TABLE.name}" 
    ADD CONSTRAINT "unique_user_tax_name" 
    UNIQUE NULLS NOT DISTINCT (user_id, tax_key, name);
  `);

  pgm.createIndex(TABLE, 'parent_id');
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);

  pgm.dropType(CATEGORY_STATUS);
  pgm.dropType(CATEGORY_FLOW_TYPE);
};
