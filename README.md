# LedgerNova Postgres

This is a Docker image for a PostgreSQL database that is used for running migrations on the LedgerNova database.

## How to run

- Populate the .env file with the required environment variables\
  (see .env.sample for the required environment variables)
- Run `npm install` to install the dependencies
- Run the start script
  ```bash
  npm start
  ```
- Run the migration script
  ```bash
  npm run migrate
  ```

Visit the [pg-migrate documentation](https://github.com/salsita/node-pg-migrate) for more information on how to use the migration script.
