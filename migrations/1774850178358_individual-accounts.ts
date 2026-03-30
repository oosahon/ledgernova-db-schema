import { MigrationBuilder } from 'node-pg-migrate';
import { individualAccountsTable } from '../config/accounting';
import { usersTable } from '../config/users';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    individualAccountsTable,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      user_id: { type: 'uuid', references: usersTable, notNull: true },

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
  pgm.dropTable(individualAccountsTable);
};
