import { MigrationBuilder } from 'node-pg-migrate';
import { accountingDomainTypeSchema } from '../definitions/accounting';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(accountingDomainTypeSchema, [
    'individual',
    'sole_trader',
    'organization',
  ]);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(accountingDomainTypeSchema);
};
