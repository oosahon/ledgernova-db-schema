import { MigrationBuilder } from 'node-pg-migrate';
import { CATEGORY_TYPE } from '../definitions/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(CATEGORY_TYPE, [
    'sale',
    'purchase',
    'credit_note',
    'debit_note',
    'expense',
    'payment',
    'receipt',
  ]);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(CATEGORY_TYPE);
};
