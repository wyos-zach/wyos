import { databases } from './config';
import { db } from '../name';

export default async function getOrCreateDB() {
  try {
    // Verify the database exists; we assume your collections are already setup.
    await databases.get(db);
    console.log('Database connection verified.');
  } catch (error) {
    console.error(
      'Database error. Make sure your database exists in Appwrite.',
      error
    );
    throw error;
  }
  return databases;
}
