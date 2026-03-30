import { MigrationBuilder } from 'node-pg-migrate';
import { accountingDomainType } from '../config/accounting';


export const up = (pgm: MigrationBuilder) => {
  pgm.createType(accountingDomainType, [
    'individual',
    'sole_trader',
    'organization',
  ]);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(accountingDomainType);
};
