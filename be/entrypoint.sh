#!/bin/sh

# Print environment variables for debugging
echo "DB_HOST: $DB_HOST"
echo "DB_USER: $DB_USER"
echo "DB_PASSWORD: $DB_PASSWORD"
echo "DB_NAME: $DB_NAME"

# Run database migrations
echo "Running migrations..."
./node_modules/.bin/knex migrate:latest --env production

if [ $? -ne 0 ]; then
    echo "Migrations failed. Exiting..."
    exit 1
fi

# Run database seeds
echo "Running seeds..."
./node_modules/.bin/knex seed:run --env production

if [ $? -ne 0 ]; then
    echo "Seeding failed. Exiting..."
    exit 1
fi

# Start the application
echo "Starting the application..."
node dist/index.js
