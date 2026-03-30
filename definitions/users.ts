import { auditSchema, coreSchema } from './schemas';

export const usersTable = {
  schema: coreSchema,
  name: 'users',
};

export const userPreferencesTable = {
  schema: coreSchema,
  name: 'user_preferences',
};

export const userActivitiesTable = {
  schema: auditSchema,
  name: 'user_activities',
};
