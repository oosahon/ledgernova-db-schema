import { MigrationBuilder } from 'node-pg-migrate';
import { USERS_TABLE, CATEGORIES_TABLE as TABLE } from '../tables';
import { CATEGORY_TYPE, CATEGORY_STATUS } from '../types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(CATEGORY_TYPE, ['income', 'expense']);
  pgm.createType(CATEGORY_STATUS, ['active', 'inactive']);

  pgm.createTable(
    TABLE,
    {
      id: { type: 'uuid', primaryKey: true },
      user_id: {
        type: 'uuid',
        references: USERS_TABLE,
        onDelete: 'CASCADE',
      },
      tax_key: { type: 'varchar(250)', unique: true, notNull: true },

      type: { type: CATEGORY_TYPE, notNull: true },

      name: { type: 'varchar', notNull: true },

      description: { type: 'varchar(200)', notNull: true },

      status: {
        type: CATEGORY_STATUS,
        notNull: true,
        default: 'active',
      },

      parent_id: {
        type: 'uuid',
        references: TABLE,
        onDelete: 'RESTRICT',
      },

      created_at: {
        type: 'timestamptz',
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

  pgm.createIndex(TABLE, 'user_id');

  pgm.createIndex(TABLE, 'parent_id');
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropIndex(TABLE, 'parent_id');

  pgm.dropIndex(TABLE, 'user_id');

  pgm.dropTable(TABLE);

  pgm.dropType(CATEGORY_STATUS);
  pgm.dropType(CATEGORY_TYPE);
};
