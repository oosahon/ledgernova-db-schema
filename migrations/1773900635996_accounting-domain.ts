import { MigrationBuilder } from 'node-pg-migrate';
import { ACCOUNTING_DOMAIN } from '../definitions/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(ACCOUNTING_DOMAIN, [
    'individual',
    'sole_trader',
    'organization',
  ]);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(ACCOUNTING_DOMAIN);
};
