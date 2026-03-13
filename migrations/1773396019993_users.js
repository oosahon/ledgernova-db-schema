export const up = (pgm) => {
  pgm.createSchema('core', { ifNotExists: true });

  pgm.createTable(
    { schema: 'core', name: 'users' },
    {
      id: { type: 'uuid', primaryKey: true },

      first_name: { type: 'varchar(200)', notNull: true },

      last_name: { type: 'varchar(200)', notNull: true },

      email: { type: 'varchar(200)', notNull: true, unique: true },

      email_verified: { type: 'boolean', notNull: true },

      password: { type: 'varchar(200)' },

      created_at: { type: 'timestamptz', notNull: true },

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

export const down = (pgm) => {
  pgm.dropTable({ schema: 'core', name: 'users' }, { ifExists: true });
};
