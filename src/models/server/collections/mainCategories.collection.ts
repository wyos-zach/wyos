import { Permission } from 'node-appwrite';
import { db, mainCategoriesCollection } from '../name';
import { databases } from './config';

export default async function createMainCategoriesCollection() {
  // Create collection
  await databases.createCollection(
    db,
    mainCategoriesCollection,
    mainCategoriesCollection,
    [Permission.read('any'), Permission.write('users')]
  );

  // Create attributes
  await Promise.all([
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'name',
      64,
      true
    ),
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'slug',
      64,
      true
    ),
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'description',
      256,
      false
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
      'imageUrl',
      2048,
      false
    ),
    databases.createStringAttribute(
      db,
      mainCategoriesCollection,
      'icon',
      2048,
      false
    ),
  ]);

  /*
  // Create indexes
  await Promise.all([
    databases.createIndex(
      db,
      mainCategoriesCollection,
      'slug_unique',
      IndexType.Unique,
      ['slug']
    ),
    databases.createIndex(
      db,
      mainCategoriesCollection,
      'order_asc',
      IndexType.Key,
      ['order']
    ),
  ]);*/

  console.log('Main categories collection created');
}
