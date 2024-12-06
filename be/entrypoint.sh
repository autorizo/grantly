#!/bin/sh

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

echo "NODE_ENV: $NODE_ENV"
echo "Content of the dist directory:"
ls -l /usr/src/app/dist
