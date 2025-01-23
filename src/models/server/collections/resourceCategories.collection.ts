import { Permission } from 'node-appwrite';
import { db, resourceCategoriesCollection } from '../name';
import { databases } from './config';

export default async function createResourceCategoriesCollection() {
  await databases.createCollection(
    db,
    resourceCategoriesCollection,
    resourceCategoriesCollection,
    [Permission.read('any'), Permission.write('users')]
  );

  await Promise.all([
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'name',
      64,
      true
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'slug',
      64,
      true
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'description',
      256,
      false
    ),
    databases.createIntegerAttribute(
      db,
      resourceCategoriesCollection,
      'order',
      true,
      0,
      999999
    ),
    databases.createBooleanAttribute(
      db,
      resourceCategoriesCollection,
      'isActive',
      true,
      true
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'mainCategoryId',
      36,
      true
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'imageUrl',
      2048,
      false
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'icon',
      2048,
      false
    ),
  ]);

  console.log('Resource categories collection created');
}

/*
await Promise.all([
  databases.createIndex(
    db,
    resourceCategoriesCollection,
    'slug_unique',
    IndexType.Unique,
    ['slug']
  ),
  databases.createIndex(
    db,
    resourceCategoriesCollection,
    'order_sort',
    IndexType.Key,
    ['order']
  ),
  databases.createIndex(
    db,
    resourceCategoriesCollection,
    'main_category',
    IndexType.Key,
    ['mainCategoryId']
  ),
]);*/
