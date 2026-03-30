import { coreSchema } from './schemas';

export const accountingDomainTypeSchema = {
  name: 'accounting_domain',
  schema: coreSchema,
};

export const accountingDomainType = `${coreSchema}.accounting_domain`;
