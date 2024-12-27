#!/bin/sh

# Temporal rollback migrations
echo "Rollback migrations..."
./node_modules/.bin/knex migrate:rollback --env production

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

# Decode the secret files
echo "Decoding secrets..."
RUN echo "$STORAGE_SECRET" | base64 -d > /usr/src/app/dist/secrets/autorizo-441221-543456ed3158.json
RUN echo "$CORS_SECRET" | base64 -d > /usr/src/app/dist/secrets/cors.json

# Start the application
echo "Starting the application..."
node dist/index.js

echo "NODE_ENV: $NODE_ENV"
echo "Content of the dist directory:"
ls -l /usr/src/app/dist
