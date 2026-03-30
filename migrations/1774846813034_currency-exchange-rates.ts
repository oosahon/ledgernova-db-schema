import { MigrationBuilder } from 'node-pg-migrate';
import {
  currencyExchangeRatesTable,
  currenciesTable,
} from '../config/currencies';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(currencyExchangeRatesTable, {
    base_currency_code: {
      type: 'char(3)',
      references: currenciesTable,
      notNull: true,
      primaryKey: true,
    },

    target_currency_code: {
      type: 'char(3)',
      references: currenciesTable,
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
  pgm.dropTable(currencyExchangeRatesTable);
};
