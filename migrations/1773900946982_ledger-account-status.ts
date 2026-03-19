import { MigrationBuilder } from 'node-pg-migrate';
import { LEDGER_ACCOUNT_STATUS } from '../definitions/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(LEDGER_ACCOUNT_STATUS, [
    'active',
    'archived',
  ]);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(LEDGER_ACCOUNT_STATUS);
};
