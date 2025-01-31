import { Permission, IndexType } from 'node-appwrite';
import { db, resourceCategoriesCollection } from '../../name';
import { databases } from '../config';

export default async function createResourceCategoriesCollection() {
  await databases.createCollection(
    db,
    resourceCategoriesCollection,
    'Resource Categories',
    [Permission.read('any'), Permission.write('users')]
  );

  // Attributes
  await Promise.all([
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'name',
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'slug',
      50,
      true
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
      'description',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'imageUrl',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'icon',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      resourceCategoriesCollection,
      'mainCategoryId',
      36,
      true
    ),
  ]);

  // Indexes
  await Promise.all([
    databases.createIndex(
      db,
      resourceCategoriesCollection,
      'slug_idx',
      IndexType.Unique,
      ['slug']
    ),
    databases.createIndex(
      db,
      resourceCategoriesCollection,
      'order_active_idx',
      IndexType.Key,
      ['order', 'isActive']
    ),
    databases.createIndex(
      db,
      resourceCategoriesCollection,
      'mainCategoryId_idx',
      IndexType.Key,
      ['mainCategoryId']
    ),
  ]);
}
