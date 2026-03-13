export const shorthands = undefined;

export const up = (pgm) => {
  pgm.createSchema('audit', { ifNotExists: true });

  pgm.createTable(
    { schema: 'audit', name: 'user_activities' },
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

  pgm.createIndex({ schema: 'audit', name: 'user_activities' }, [
    'resource_type',
    'resource_id',
  ]);

  pgm.createIndex({ schema: 'audit', name: 'user_activities' }, ['actor_id']);
};

export const down = (pgm) => {
  pgm.dropTable(
    { schema: 'audit', name: 'user_activities' },
    { ifExists: true }
  );
  pgm.dropSchema('audit', { ifExists: true, cascade: true });
};
