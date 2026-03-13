import { MigrationBuilder } from 'node-pg-migrate';
import { USER_ACTIVITIES_TABLE as TABLE } from '../tables';

export const shorthands = undefined;

export const up = (pgm: MigrationBuilder) => {
  pgm.createSchema(TABLE.schema, { ifNotExists: true });

  pgm.createTable(
    TABLE,
    {
      id: { type: 'uuid', primaryKey: true },

      actor_id: {
        type: 'uuid',
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

  pgm.createIndex(TABLE, 'actor_id');
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropIndex(TABLE, 'actor_id');

  pgm.dropIndex(TABLE, ['resource_type', 'resource_id']);

  pgm.dropTable(TABLE);
  pgm.dropSchema(TABLE.schema, { ifExists: true, cascade: true });
};
