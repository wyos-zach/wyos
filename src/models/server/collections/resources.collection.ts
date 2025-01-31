import { Permission, IndexType } from 'node-appwrite';
import { db, resourcesCollection } from '../../name';
import { databases } from '../config';

export default async function createResourcesCollection() {
  await databases.createCollection(db, resourcesCollection, 'Resources', [
    Permission.read('any'),
    Permission.write('users'),
  ]);

  // Attributes
  await Promise.all([
    databases.createStringAttribute(db, resourcesCollection, 'title', 50, true),
    databases.createStringAttribute(db, resourcesCollection, 'slug', 50, true),
    databases.createEnumAttribute(
      db,
      resourcesCollection,
      'type',
      ['book', 'app', 'podcast', 'course', 'youtube'],
      true
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'description',
      1000,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'resourceUrl',
      250,
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
      'imageUrl',
      250,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'creator',
      50,
      false
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'platform',
      50,
      false
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
      25,
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
      'isActive',
      true,
      true
    ),
    databases.createStringAttribute(
      db,
      resourcesCollection,
      'resourceCategoryId',
      36,
      true
    ),
  ]);

  // Indexes
  await Promise.all([
    databases.createIndex(
      db,
      resourcesCollection,
      'slug_idx',
      IndexType.Unique,
      ['slug']
    ),
    databases.createIndex(
      db,
      resourcesCollection,
      'title_desc_ft',
      IndexType.Fulltext,
      ['title', 'description']
    ),
    databases.createIndex(db, resourcesCollection, 'type_idx', IndexType.Key, [
      'type',
    ]),
    databases.createIndex(
      db,
      resourcesCollection,
      'featured_idx',
      IndexType.Key,
      ['featured']
    ),
    databases.createIndex(
      db,
      resourcesCollection,
      'isActive_idx',
      IndexType.Key,
      ['isActive']
    ),
    databases.createIndex(
      db,
      resourcesCollection,
      'categoryId_idx',
      IndexType.Key,
      ['resourceCategoryId']
    ),
    databases.createIndex(
      db,
      resourcesCollection,
      'createdAt_idx',
      IndexType.Key,
      ['$createdAt']
    ),
  ]);
}
