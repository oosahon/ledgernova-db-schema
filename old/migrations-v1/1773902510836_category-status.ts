import { MigrationBuilder } from 'node-pg-migrate';
import { CATEGORY_STATUS } from '../definitions-v1/types';

export const up = (pgm: MigrationBuilder) => {
  pgm.createType(CATEGORY_STATUS, ['active', 'archived']);
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropType(CATEGORY_STATUS);
};
