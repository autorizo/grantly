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
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
    },
    migrations: {
      directory: path.join(__dirname, 'dist/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'dist/db/seeds'),
    },
    pool: {
      min: 2,
      max: 10,
      acquireTimeoutMillis: 60000, // Increase timeout to avoid connection issues
    },
  },
};

module.exports = config;
