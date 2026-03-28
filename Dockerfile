FROM postgres:15

# Set a default password for the main postgres user
ENV POSTGRES_PASSWORD=postgres

# Expose the standard PostgreSQL port
EXPOSE 5432

# Copy the initialization script to the special entrypoint folder
# Scripts in this folder are automatically run by the postgres docker image on startup
COPY bin/setup-postgres.sh /docker-entrypoint-initdb.d/setup-postgres.sh

# Make sure the script is executable
RUN chmod +x /docker-entrypoint-initdb.d/setup-postgres.sh
