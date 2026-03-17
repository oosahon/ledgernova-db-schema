import { MigrationBuilder } from 'node-pg-migrate';
import { LEDGER_ACCOUNT_TYPE } from '../definitions/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(LEDGER_ACCOUNT_TYPE, [
    'asset',
    'liability',
    'equity',
    'revenue',
    'expense',
  ]);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(LEDGER_ACCOUNT_TYPE);
};
