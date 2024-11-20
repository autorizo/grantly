import knex from 'knex';
import config from './knexfile';

const db = knex(config.development);

// Example of running a migration rollback
db.migrate.rollback()
  .then(() => {
    console.info('Rollback completed');
    return db.destroy(); // Close the connection
  })
  .catch((err) => {
    console.error('Error running rollback:', err);
    return db.destroy(); // Close the connection
  });
