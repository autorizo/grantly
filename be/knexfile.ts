import dotenv from 'dotenv';
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
    client: 'mysql',
    connection: process.env.DATABASE_URL, // Use DATABASE_URL in production
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

export default config;
