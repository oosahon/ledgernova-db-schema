import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true });
  pgm.createSchema('core', { ifNotExists: true });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropSchema('core', { ifExists: true, cascade: true });
};
