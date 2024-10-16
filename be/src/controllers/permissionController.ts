import knex from '@db/index';
import dayjs from 'dayjs';

// Log a specific state for a user's permission
export const logPermissionState = async (
  userId: string,
  permissionId: string,
  state: 'active' | 'blocked' | 'disabled', // Accepts only valid states
  justification?: string // Optional justification for the state change
) => {
  try {
    // Create a log entry for the given state
    const logEntry = {
      user_id: userId,
      permission_id: permissionId,
      status: state,
      justification: justification || null, // Set justification, defaulting to null
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Record the current timestamp
    };

    await knex('user_permissions').insert(logEntry);

    // Return the logged permission state
    return {
      userId,
      permissionId,
      status: state,
      justification: justification || null,
    };
  } catch (error) {
    console.error('Error logging permission state:', error);
    throw error;
  }
};
