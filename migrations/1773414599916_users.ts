import { MigrationBuilder } from 'node-pg-migrate';
import { USERS_TABLE as TABLE } from '../definitions/tables';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    TABLE,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      first_name: { type: 'varchar(200)', notNull: true },

      last_name: { type: 'varchar(200)', notNull: true },

      email: { type: 'varchar(200)', notNull: true, unique: true },

      email_verified: { type: 'boolean', notNull: true },

      password: { type: 'varchar(200)' },

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
  pgm.dropTable(TABLE);
};
