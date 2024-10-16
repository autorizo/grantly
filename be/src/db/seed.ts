// src/run-seed.ts
import knex from 'knex';
import config from './knexfile';

// Initialize Knex
const db = knex(config.development);

// Function to run seeds
const runSeeds = async () => {
  try {
    await db.seed.run(); // Run all seeds
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error running seeds:', error);
  } finally {
    await db.destroy(); // Close the database connection
  }
};

// Execute the function
runSeeds();
