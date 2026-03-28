import { MigrationBuilder } from 'node-pg-migrate';
import {
  TRANSACTION_ITEMS_TABLE as TABLE,
  TRANSACTIONS_TABLE,
  CATEGORIES_TABLE,
  CURRENCIES_TABLE,
} from '../definitions/tables';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    TABLE,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      name: { type: 'varchar(200)', notNull: true },

      transaction_id: {
        type: 'uuid',
        references: TRANSACTIONS_TABLE,
        onDelete: 'CASCADE',
        notNull: true,
      },

      category_id: {
        type: 'uuid',
        references: CATEGORIES_TABLE,
        onDelete: 'RESTRICT',
        notNull: true,
      },

      amount: { type: 'bigint', notNull: true },

      currency_code: {
        type: 'varchar(3)',
        references: CURRENCIES_TABLE,
        notNull: true,
      },

      functional_currency_amount: { type: 'bigint', notNull: true },

      quantity: { type: 'numeric(20, 10)', notNull: true },

      unit_price: { type: 'bigint' },

      is_system_generated: {
        type: 'boolean',
        notNull: true,
        default: false,
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

  pgm.createIndex(TABLE, 'transaction_id');
  pgm.createIndex(TABLE, 'category_id');
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
