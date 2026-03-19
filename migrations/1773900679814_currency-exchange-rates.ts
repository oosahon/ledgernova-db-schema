import { CURRENCY_EXCHANGE_RATES_TABLE as TABLE } from '../definitions/tables';
import { CURRENCIES_TABLE } from '../definitions/tables';
import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(TABLE, {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },

    base_currency_code: {
      type: 'char(3)',
      references: CURRENCIES_TABLE,
      notNull: true,
    },

    target_currency_code: {
      type: 'char(3)',
      references: CURRENCIES_TABLE,
      notNull: true,
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
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
