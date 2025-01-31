import { Permission, IndexType } from 'node-appwrite';
import { db, mainCategoriesCollection } from '../../name';
import { databases } from '../config';

export default async function createMainCategoriesCollection() {
  await databases.createCollection(
    db,
    mainCategoriesCollection,
    'Main Categories',
    [Permission.read('any'), Permission.write('users')]
  );

  // Attributes
  await Promise.all([
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'name',
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'slug',
      50,
      true
    ),
    databases.createIntegerAttribute(
      db,
      mainCategoriesCollection,
      'order',
      true,
      0,
      999999
    ),
    databases.createBooleanAttribute(
      db,
      mainCategoriesCollection,
      'isActive',
      true,
      true
    ),
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'description',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'imageUrl',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'icon',
      250,
      false
    ),
  ]);

  // Indexes
  await Promise.all([
    databases.createIndex(
      db,
      mainCategoriesCollection,
      'slug_idx',
      IndexType.Unique,
      ['slug']
    ),
    databases.createIndex(
      db,
      mainCategoriesCollection,
      'order_idx',
      IndexType.Key,
      ['order']
    ),
    databases.createIndex(
      db,
      mainCategoriesCollection,
      'isActive_idx',
      IndexType.Key,
      ['isActive']
    ),
    databases.createIndex(
      db,
      mainCategoriesCollection,
      'createdAt_idx',
      IndexType.Key,
      ['$createdAt']
    ),
  ]);
}
