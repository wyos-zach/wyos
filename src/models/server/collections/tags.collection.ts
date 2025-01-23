import { Permission } from 'node-appwrite';
import { db, tagsCollection } from '../name';
import { databases } from './config';

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

  /*
  // Create indexes
  await Promise.all([
    databases.createIndex(db, tagsCollection, 'slug_unique', IndexType.Unique, [
      'slug',
    ]),
    databases.createIndex(db, tagsCollection, 'name', IndexType.Fulltext, [
      'name',
    ]),
  ]);

  console.log('Tags collection created');
}*/
}
