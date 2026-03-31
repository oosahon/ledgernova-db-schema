import { MigrationBuilder } from 'node-pg-migrate';
import { userActivitiesTable, usersTable } from '../config/users';

export const shorthands = undefined;

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    userActivitiesTable,
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('uuid_generate_v4()'),
      },

      user_id: {
        type: 'uuid',
        references: usersTable,
        onDelete: 'CASCADE',
        notNull: false,
      },

      action: { type: 'varchar(50)', notNull: true },

      resource_type: { type: 'varchar(50)', notNull: true },

      resource_id: { type: 'uuid', notNull: true },

      metadata: { type: 'jsonb' },

      created_at: {
        type: 'timestamptz',
        notNull: true,
        default: pgm.func('now()'),
      },
    },
    {
      ifNotExists: true,
    }
  );

  pgm.createIndex(userActivitiesTable, ['resource_type', 'resource_id']);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(userActivitiesTable);
};
