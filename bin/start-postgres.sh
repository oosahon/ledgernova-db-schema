#!/bin/bash
set -e

# Load the environment variables to access DATABASE_PORT
source .env

echo "Building the ${CONTAINER_NAME} Docker image..."
docker build -t ${CONTAINER_NAME} .

echo "Running ${CONTAINER_NAME} on port ${DATABASE_PORT:-5432}..."
docker run -d --name ${CONTAINER_NAME} -p "${DATABASE_PORT:-5432}":5432 --env-file .env ${CONTAINER_NAME}
