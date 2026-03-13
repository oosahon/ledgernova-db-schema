import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createSchema('audit', { ifNotExists: true });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropSchema('audit', { ifExists: true, cascade: true });
};
