import { MigrationBuilder } from 'node-pg-migrate';
import { CURRENCIES_TABLE } from '../definitions/tables';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(CURRENCIES_TABLE, {
    code: {
      type: 'char(3)',
      primaryKey: true,
      unique: true,
    },
    symbol: {
      type: 'varchar(5)',
      notNull: true,
    },
    name: {
      type: 'varchar(50)',
      notNull: true,
    },
    minor_unit: {
      type: 'smallint',
      notNull: true,
    },
    created_at: {
      type: 'timestamp with time zone',
      default: pgm.func('now()'),
      notNull: true,
    },
    updated_at: {
      type: 'timestamp with time zone',
      default: pgm.func('now()'),
      notNull: true,
    },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(CURRENCIES_TABLE);
};
