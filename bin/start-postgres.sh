#!/bin/bash
set -e

# Load the environment variables to access DATABASE_PORT
source .env

echo "Building the ledgernova_postgres Docker image..."
docker build -t ledgernova_postgres .

echo "Running ledgernova_postgres on port ${DATABASE_PORT:-5432}..."
# The --rm flag automatically removes the container when it is stopped
docker run --rm --name ledgernova_postgres -p "${DATABASE_PORT:-5432}":5432 --env-file .env ledgernova_postgres
