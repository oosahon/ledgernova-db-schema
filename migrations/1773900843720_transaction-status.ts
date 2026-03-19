import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';
import { TRANSACTION_STATUS } from '../definitions/types';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType(TRANSACTION_STATUS, [
    'pending',
    'posted',
    'voided',
    'archived',
  ]);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropType(TRANSACTION_STATUS);
}
