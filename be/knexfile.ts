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
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
      acquireTimeoutMillis: 60000,
    },
  },
};

module.exports = config;
