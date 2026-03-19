// ============================= CORE =============================
export const USERS_TABLE = { schema: 'core', name: 'users' };

export const LEDGER_ACCOUNTS_TABLE = {
  schema: 'core',
  name: 'ledger_accounts',
};

export const USER_LEDGER_ACCOUNTS_TABLE = {
  schema: 'core',
  name: 'user_ledger_accounts',
};

export const CURRENCIES_TABLE = { schema: 'core', name: 'currencies' };

export const CURRENCY_EXCHANGE_RATES_TABLE = {
  schema: 'core',
  name: 'currency_exchange_rates',
};

export const TRANSACTIONS_TABLE = { schema: 'core', name: 'transactions' };

export const TRANSACTION_ITEMS_TABLE = {
  schema: 'core',
  name: 'transaction_items',
};

export const CATEGORIES_TABLE = { schema: 'core', name: 'categories' };

// ============================= AUDIT =============================
export const USER_ACTIVITIES_TABLE = {
  schema: 'audit',
  name: 'user_activities',
};
