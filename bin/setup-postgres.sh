#!/bin/bash
set -e

# Strip quotes in case Docker passes them from the .env file verbatim
DB_NAME=$(echo "$DATABASE_NAME" | tr -d '"' | tr -d "'")
USER_ADMIN=$(echo "$DATABASE_USER_ADMIN" | tr -d '"' | tr -d "'")
PASS_ADMIN=$(echo "$DATABASE_USER_ADMIN_PASSWORD" | tr -d '"' | tr -d "'")
USER_CORE=$(echo "$DATABASE_USER_CORE" | tr -d '"' | tr -d "'")
PASS_CORE=$(echo "$DATABASE_USER_CORE_PASSWORD" | tr -d '"' | tr -d "'")

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER "$USER_ADMIN" WITH SUPERUSER PASSWORD '$PASS_ADMIN';
	CREATE USER "$USER_CORE" WITH PASSWORD '$PASS_CORE';
	CREATE DATABASE "$DB_NAME" OWNER "$USER_ADMIN";
	GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO "$USER_ADMIN";
EOSQL

# Connect to the new database to grant schema privileges
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
	GRANT ALL ON SCHEMA public TO "$USER_ADMIN";
EOSQL
