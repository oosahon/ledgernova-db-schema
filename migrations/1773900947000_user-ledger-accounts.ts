import { MigrationBuilder } from 'node-pg-migrate';
import {
  USER_LEDGER_ACCOUNTS_TABLE as TABLE,
  USERS_TABLE,
  LEDGER_ACCOUNTS_TABLE,
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

      user_id: {
        type: 'uuid',
        references: USERS_TABLE,
        onDelete: 'CASCADE',
        notNull: true,
      },

      ledger_account_id: {
        type: 'uuid',
        references: LEDGER_ACCOUNTS_TABLE,
        onDelete: 'CASCADE',
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

      deleted_at: { type: 'timestamptz' },
    },
    {
      ifNotExists: true,
    }
  );

  pgm.createIndex(TABLE, 'user_id');
  pgm.createIndex(TABLE, 'ledger_account_id');

  pgm.addConstraint(TABLE, 'unique_user_ledger_account', {
    unique: ['user_id', 'ledger_account_id'],
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
