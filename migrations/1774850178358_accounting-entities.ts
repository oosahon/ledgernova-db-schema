import { MigrationBuilder } from 'node-pg-migrate';
import {
  accountingEntitiesTable,
  accountingEntityType,
} from '../config/accounting';
import { usersTable } from '../config/users';
import { currenciesTable } from '../config/currencies';
import toSchemaString from '../utils/to-schema-string';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    accountingEntitiesTable,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      type: {
        type: toSchemaString(accountingEntityType),
        notNull: true,
      },

      owner_id: { type: 'uuid', references: usersTable, notNull: true },

      functional_currency_code: {
        type: 'varchar(3)',
        references: currenciesTable,
        notNull: true,
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
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(accountingEntitiesTable);
};
