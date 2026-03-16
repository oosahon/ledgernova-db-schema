import { MigrationBuilder } from 'node-pg-migrate';
import {
  USER_ACTIVITIES_TABLE as TABLE,
  USERS_TABLE,
} from '../definitions/tables';

export const shorthands = undefined;

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

  pgm.createIndex(TABLE, ['resource_type', 'resource_id']);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable(TABLE);
};
