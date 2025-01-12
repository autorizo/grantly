#!/bin/sh

# Temporal rollback migrations
# echo "Rollback migrations..."
# ./node_modules/.bin/knex migrate:rollback --env production

# Run database migrations
# echo "Running migrations..."
# ./node_modules/.bin/knex migrate:latest --env production

if [ $? -ne 0 ]; then
    echo "Migrations failed. Exiting..."
    exit 1
fi

# Run database seeds
# echo "Running seeds..."
# ./node_modules/.bin/knex seed:run --env production

# if [ $? -ne 0 ]; then
#     echo "Seeding failed. Exiting..."
#     exit 1
# fi

# Decode the secret files
echo "Decoding secrets..."
# Create the secrets directory if it doesn't exist
echo "Creating /secrets directory..."
mkdir -p /usr/src/app/secrets || {
    echo "Failed to create directory /usr/src/app/secrets"
    exit 1
}

echo "$STORAGE_SECRET" | base64 -d > /usr/src/app/secrets/autorizo-441221-543456ed3158.json || {
    echo "Failed to decode or write the secret file"
    exit 1
}
# Verify the file was created
if [ -f /usr/src/app/secrets/autorizo-441221-543456ed3158.json ]; then
    echo "Secret file successfully created."
else
    echo "Secret file was not created."
    exit 1
fi

echo "$CORS_SECRET" | base64 -d > /usr/src/app/secrets/cors.json || {
    echo "Failed to decode or write secret file"
    exit 1
}

# Start the application
echo "Starting the application..."
node dist/index.js

echo "NODE_ENV: $NODE_ENV"
echo "Content of the dist directory:"
ls -l /usr/src/app/dist
