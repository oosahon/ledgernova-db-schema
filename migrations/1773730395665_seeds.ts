import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable(
    'seeds',
    {
      id: {
        type: 'serial',
        primaryKey: true,
      },

      file_name: { type: 'varchar(250)', notNull: true },

      created_at: {
        type: 'timestamptz',
        default: pgm.func('now()'),
        notNull: true,
      },
    },
    {
      ifNotExists: true,
    }
  );
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('seeds');
};
