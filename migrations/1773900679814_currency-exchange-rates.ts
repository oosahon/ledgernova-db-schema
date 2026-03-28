import { CURRENCY_EXCHANGE_RATES_TABLE as TABLE } from '../definitions/tables';
import { CURRENCIES_TABLE } from '../definitions/tables';
import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(TABLE, {
    base_currency_code: {
      type: 'char(3)',
      references: CURRENCIES_TABLE,
      notNull: true,
      primaryKey: true,
    },

    target_currency_code: {
      type: 'char(3)',
      references: CURRENCIES_TABLE,
      notNull: true,
      primaryKey: true,
    },

    rate: {
      type: 'numeric(20, 10)',
      notNull: true,
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

    deleted_at: {
      type: 'timestamptz',
    },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
