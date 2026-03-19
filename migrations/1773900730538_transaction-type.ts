import { MigrationBuilder } from 'node-pg-migrate';
import { TRANSACTION_TYPE } from '../definitions/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(TRANSACTION_TYPE, [
    'sale',
    'purchase',
    'credit_note',
    'debit_note',
    'expense',
    'transfer',
    'payment',
    'receipt',
    'journal',
  ]);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(TRANSACTION_TYPE);
};
