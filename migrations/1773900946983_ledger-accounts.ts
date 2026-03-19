import { MigrationBuilder } from 'node-pg-migrate';
import {
  LEDGER_ACCOUNTS_TABLE as TABLE,
  CURRENCIES_TABLE,
  USERS_TABLE,
} from '../definitions/tables';
import { LEDGER_ACCOUNT_TYPE_NAME, LEDGER_ACCOUNT_STATUS_NAME } from '../definitions/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    TABLE,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      ledger_code: {
        type: 'varchar(50)',
        notNull: true,
      },

      ledger_type: {
        type: LEDGER_ACCOUNT_TYPE_NAME,
        notNull: true,
      },

      ledger_account_type: {
        type: 'varchar(100)',
        notNull: true,
      },

      name: { type: 'varchar(100)', notNull: true },

      currency_code: {
        type: 'varchar(3)',
        references: CURRENCIES_TABLE,
        notNull: true,
      },

      status: {
        type: LEDGER_ACCOUNT_STATUS_NAME,
        notNull: true,
        default: 'active',
      },

      parent_id: {
        type: 'uuid',
        references: TABLE,
        onDelete: 'CASCADE',
      },

      sub_type: {
        type: 'varchar(100)',
      },

      created_by: {
        type: 'uuid',
        references: USERS_TABLE,
        onDelete: 'SET NULL',
      },

      created_at: {
        type: 'timestamptz',
        notNull: true,
        default: pgm.func('now()'),
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

  pgm.createIndex(TABLE, 'parent_id');
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
