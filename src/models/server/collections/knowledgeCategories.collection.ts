import { Permission } from 'node-appwrite';
import { db, knowledgeCategoriesCollection } from '../name';
import { databases } from './config';

export default async function createKnowledgeCategoriesCollection() {
  await databases.createCollection(
    db,
    knowledgeCategoriesCollection,
    knowledgeCategoriesCollection,
    [Permission.read('any'), Permission.write('users')]
  );

  await Promise.all([
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'name',
      64,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'slug',
      64,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'description',
      256,
      false
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
      'mainCategoryId',
      36,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'imageUrl',
      2048,
      false
    ),
    databases.createStringAttribute(
      db,
      knowledgeCategoriesCollection,
      'icon',
      2048,
      false
    ),
  ]);

  /*
  await Promise.all([
    databases.createIndex(
      db,
      knowledgeCategoriesCollection,
      'slug_unique',
      IndexType.Unique,
      ['slug']
    ),
    databases.createIndex(
      db,
      knowledgeCategoriesCollection,
      'order_asc',
      IndexType.Key,
      ['order']
    ),
    databases.createIndex(
      db,
      knowledgeCategoriesCollection,
      'main_category',
      IndexType.Key,
      ['mainCategoryId']
    ),
  ]);*/

  console.log('Knowledge categories collection created');
}
