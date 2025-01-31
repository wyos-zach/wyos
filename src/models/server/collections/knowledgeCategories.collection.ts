import { Permission, IndexType } from 'node-appwrite';
import { db, knowledgeCategoriesCollection } from '../../name';
import { databases } from '../config';

export default async function createKnowledgeCategoriesCollection() {
  await databases.createCollection(
    db,
    knowledgeCategoriesCollection,
    'Knowledge Categories',
    [Permission.read('any'), Permission.write('users')]
  );

  // Attributes
  await Promise.all([
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'name',
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'slug',
      50,
      true
    ),
    databases.createIntegerAttribute(
      db,
      knowledgeCategoriesCollection,
      'order',
      true,
      0,
      999999
    ),
    databases.createBooleanAttribute(
      db,
      knowledgeCategoriesCollection,
      'isActive',
      true,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'description',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'imageUrl',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'icon',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'mainCategoryId',
      36,
      true
    ),
  ]);

  // Indexes
  await Promise.all([
    databases.createIndex(
      db,
      knowledgeCategoriesCollection,
      'slug_idx',
      IndexType.Unique,
      ['slug']
    ),
    databases.createIndex(
      db,
      knowledgeCategoriesCollection,
      'order_active_idx',
      IndexType.Key,
      ['order', 'isActive']
    ),
    databases.createIndex(
      db,
      knowledgeCategoriesCollection,
      'mainCategoryId_idx',
      IndexType.Key,
      ['mainCategoryId']
    ),
  ]);
}
