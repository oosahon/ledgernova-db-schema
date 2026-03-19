import { MigrationBuilder } from 'node-pg-migrate';
import {
  LEDGER_ACCOUNTS_TABLE,
  TRANSACTIONS_TABLE as TABLE,
  USERS_TABLE,
  CURRENCIES_TABLE,
} from '../definitions/tables';
import {
  TRANSACTION_TYPE_NAME,
  TRANSACTION_STATUS_NAME,
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

      type: {
        type: TRANSACTION_TYPE_NAME,
        notNull: true,
      },

      status: {
        type: TRANSACTION_STATUS_NAME,
        notNull: true,
      },

      created_by: {
        type: 'uuid',
        references: USERS_TABLE,
        onDelete: 'CASCADE',
      },

      ledger_account_id: {
        type: 'uuid',
        references: LEDGER_ACCOUNTS_TABLE,
        onDelete: 'CASCADE',
      },

      amount: { type: 'bigint', notNull: true },

      currency_code: {
        type: 'varchar(3)',
        references: CURRENCIES_TABLE,
        notNull: true,
      },

      functional_currency_amount: { type: 'bigint', notNull: true },

      date: { type: 'date', notNull: true },

      recipient_account_id: {
        type: 'uuid',
        references: LEDGER_ACCOUNTS_TABLE,
        onDelete: 'CASCADE',
      },

      exchange_rate: {
        type: 'numeric(20, 10)',
        notNull: true,
      },

      notes: { type: 'text' },

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
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
