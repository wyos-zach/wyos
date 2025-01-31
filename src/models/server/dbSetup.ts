import { db } from '../name';
import { databases } from './config';
import createMainCategoriesCollection from './collections/mainCategories.collection';
import createKnowledgeCategoriesCollection from './collections/knowledgeCategories.collection';
import createKnowledgeCollection from './collections/knowledge.collection';
import createResourceCategoriesCollection from './collections/resourceCategories.collection';
import createResourcesCollection from './collections/resources.collection';
import createTagsCollection from './collections/tags.collection';
import { IndexType } from 'node-appwrite';

export default async function getOrCreateDB() {
  try {
    // Always attempt database creation (idempotent)
    await databases.create(db, db);
    console.log('Database verified');
  } catch (error) {
    if (!(error as any)?.message?.includes('already exists')) {
      console.error('Database creation error:', error);
      throw error;
    }
  }

  // Collection creation with error handling
  const collectionCreation = async (fn: () => Promise<void>, name: string) => {
    try {
      await fn();
      console.log(`${name} collection verified`);
    } catch (error) {
      // 409 implies collection already exists
      if ((error as any).code === 409) {
        console.warn(`${name} already exists - updating indexes`);
        await updateCollectionIndexes(name);
      } else {
        console.error(`${name} creation failed:`, error);
        throw error;
      }
    }
  };

  await Promise.all([
    collectionCreation(createMainCategoriesCollection, 'main-categories'),
    collectionCreation(
      createKnowledgeCategoriesCollection,
      'knowledge-categories'
    ),
    collectionCreation(createKnowledgeCollection, 'knowledge'),
    collectionCreation(
      createResourceCategoriesCollection,
      'resource-categories'
    ),
    collectionCreation(createResourcesCollection, 'resources'),
    collectionCreation(createTagsCollection, 'tags'),
  ]);

  return databases;
}

// Helper to update indexes on existing collections
async function updateCollectionIndexes(collectionId: string) {
  const indexesToCreate = getIndexConfigForCollection(collectionId);
  if (!indexesToCreate.length) {
    console.log(`No indexes to update for collection: ${collectionId}`);
    return;
  }

  try {
    await Promise.all(
      indexesToCreate.map(async (indexConfig) => {
        // indexConfig = ['indexName', IndexType, ['attr1', 'attr2']]
        await databases.createIndex(
          db,
          collectionId,
          indexConfig[0],
          indexConfig[1],
          indexConfig[2]
        );
      })
    );
    console.log(`Updated indexes for ${collectionId}`);
  } catch (error) {
    console.error(`Index update failed for ${collectionId}:`, error);
  }
}

type CollectionIndexConfig = {
  [key: string]: Array<[string, IndexType, string[]]>;
};

function getIndexConfigForCollection(collectionId: string) {
  const indexMap: CollectionIndexConfig = {
    'main-categories': [
      ['slug_idx', IndexType.Unique, ['slug']],
      ['order_idx', IndexType.Key, ['order']],
      ['isActive_idx', IndexType.Key, ['isActive']],
      ['createdAt_idx', IndexType.Key, ['$createdAt']],
    ],
    'knowledge-categories': [
      ['slug_idx', IndexType.Unique, ['slug']],
      ['order_active_idx', IndexType.Key, ['order', 'isActive']],
      ['mainCategoryId_idx', IndexType.Key, ['mainCategoryId']],
    ],
    knowledge: [
      ['slug_idx', IndexType.Unique, ['slug']],
      ['title_summary_ft', IndexType.Fulltext, ['title', 'summary']],
      ['featured_idx', IndexType.Key, ['featured']],
      ['categoryId_idx', IndexType.Key, ['knowledgeCategoryId']],
      // Add createdAt_idx if you need it
      // ['createdAt_idx', IndexType.Key, ['$createdAt'], DatabaseIndexOrder.Desc],
    ],
    'resource-categories': [
      ['slug_idx', IndexType.Unique, ['slug']],
      ['order_active_idx', IndexType.Key, ['order', 'isActive']],
      ['mainCategoryId_idx', IndexType.Key, ['mainCategoryId']],
    ],
    resources: [
      ['slug_idx', IndexType.Unique, ['slug']],
      ['title_summary_idx', IndexType.Fulltext, ['title', 'summary']],
      ['type_idx', IndexType.Key, ['type']],
      ['categoryId_idx', IndexType.Key, ['resourceCategoryId']],
      ['featured_idx', IndexType.Key, ['featured']],
    ],
    tags: [
      ['slug_idx', IndexType.Unique, ['slug']],
      ['name_idx', IndexType.Fulltext, ['name']],
    ],
  };

  return indexMap[collectionId] || [];
}
