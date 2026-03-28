import { MigrationBuilder } from 'node-pg-migrate';
import { CURRENCIES_TABLE as TABLE } from '../definitions/tables';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable(
    TABLE,
    {
      code: {
        type: 'char(3)',
        primaryKey: true,
        unique: true,
      },

      symbol: { type: 'varchar(5)', notNull: true },

      name: { type: 'varchar(50)', notNull: true },

      minor_unit: { type: 'smallint', notNull: true },

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

      deleted_at: {
        type: 'timestamptz',
      },
    },
    {
      ifNotExists: true,
    }
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable(TABLE);
}
