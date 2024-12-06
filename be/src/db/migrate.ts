// src/run-migrate.ts
import knex from 'knex';
import config from './knexfile';

// Initialize Knex
const db = knex(config.development);

// Function to run migrations
const runMigrations = async () => {
  try {
    await db.migrate.latest(); // Run all pending migrations
    console.info('Migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await db.destroy(); // Close the database connection
  }
};

// Execute the function
runMigrations();
