import { db } from '../name';
import createResourcesCollection from './collections/resources.collection';
import createKnowledgeCategoriesCollection from './collections/knowledgeCategories.collection';
import createMainCategoriesCollection from './collections/mainCategories.collection';
import createResourceCategoriesCollection from './collections/resourceCategories.collection';
import createTagsCollection from './collections/tags.collection';
import createKnowledgeCollection from './collections/knowledge.collection';
import { databases } from './config';

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log('Database connection');
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log('Database created');
      // Create collections
      await Promise.all([
        createResourcesCollection(),
        createKnowledgeCollection(),
        createKnowledgeCategoriesCollection(),
        createMainCategoriesCollection(),
        createResourceCategoriesCollection(),
        createTagsCollection(),
      ]);
      console.log('Collections created');
      console.log('Database connected');
    } catch (error) {
      console.error('Error creating database or collection', error);
    }
  }

  return databases;
}
