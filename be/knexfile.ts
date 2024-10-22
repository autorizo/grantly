import dotenv from 'dotenv';
import path from 'path';
dotenv.config();


const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: 'src/db/migrations',
    },
    seeds: {
      directory: 'src/db/seeds',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST, // If DATABASE_URL doesn't work, switch to individual env variables
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: true, // Adjust this if Railway requires SSL; otherwise, remove
      },
    },
    migrations: {
      directory: path.join(__dirname, 'dist/db/migrations'), // Use compiled JS paths
    },
    seeds: {
      directory: path.join(__dirname, 'dist/db/seeds'), // Use compiled JS paths
    },
    pool: {
      min: 2,
      max: 10, // Ensure pool settings to prevent overloading MySQL connections
      acquireTimeoutMillis: 60000, // Set timeout for acquiring a connection
    },
  },
};

module.exports = config;
