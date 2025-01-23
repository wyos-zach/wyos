import { Permission } from 'node-appwrite';
import { db, resourcesCollection } from '../name';
import { databases } from './config';

export default async function createResourcesCollection() {
  await databases.createCollection(
    db,
    resourcesCollection,
    resourcesCollection,
    [Permission.read('any'), Permission.read('users')]
  );

  await Promise.all([
    databases.createStringAttribute(db, resourcesCollection, 'type', 32, true),
    databases.createStringAttribute(db, resourcesCollection, 'title', 64, true),
    databases.createStringAttribute(db, resourcesCollection, 'slug', 64, true),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'description',
      2048,
      true
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'resourceUrl',
      2048,
      false
    ),
    databases.createBooleanAttribute(
      db,
      resourcesCollection,
      'featured',
      true,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'author',
      64,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'platform',
      64,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'imageUrl',
      2048,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'seoDescription',
      256,
      false
    ),
    databases.createFloatAttribute(
      db,
      resourcesCollection,
      'rating',
      false,
      0,
      5
    ),
    databases.createBooleanAttribute(
      db,
      resourcesCollection,
      'isPaid',
      true,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'price',
      32,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'categoryId',
      36,
      true
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'userId',
      36,
      true
    ),
  ]);

  console.log('Resources collection created');
}

/*
await Promise.all([
  databases.createIndex(
    db,
    resourcesCollection,
    'title_search',
    IndexType.Fulltext,
    ['title']
  ),
  databases.createIndex(
    db,
    resourcesCollection,
    'category_lookup',
    IndexType.Key,
    ['categoryId']
  ),
  databases.createIndex(db, resourcesCollection, 'type_filter', IndexType.Key, [
    'type',
  ]),
  databases.createIndex(
    db,
    resourcesCollection,
    'featured_filter',
    IndexType.Key,
    ['featured']
  ),
]);*/
