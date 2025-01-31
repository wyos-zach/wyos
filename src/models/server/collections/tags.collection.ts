import { IndexType, Permission } from 'node-appwrite';
import { db, tagsCollection } from '../../name';
import { databases } from '../config';

export default async function createTagsCollection() {
  // Create collection
  await databases.createCollection(db, tagsCollection, tagsCollection, [
    Permission.read('any'),
    Permission.write('users'),
  ]);

  // Create attributes
  await Promise.all([
    databases.createStringAttribute(db, tagsCollection, 'name', 32, true),
    databases.createStringAttribute(db, tagsCollection, 'slug', 32, true),
    databases.createBooleanAttribute(
      db,
      tagsCollection,
      'isActive',
      true,
      true
    ),
  ]);

  await Promise.all([
    databases.createIndex(db, tagsCollection, 'slug_idx', IndexType.Unique, [
      'slug',
    ]),
    databases.createIndex(db, tagsCollection, 'name_idx', IndexType.Fulltext, [
      'name',
    ]),
  ]);

  console.log('Tags collection created');
}
