import { Permission, IndexType } from 'node-appwrite';
import { db, knowledgeCollection } from '../../name';
import { databases } from '../config';

export default async function createKnowledgeCollection() {
  await databases.createCollection(db, knowledgeCollection, 'Knowledge', [
    Permission.read('any'),
    Permission.write('users'),
  ]);

  // Attributes
  await Promise.all([
    databases.createStringAttribute(db, knowledgeCollection, 'title', 50, true),
    databases.createStringAttribute(db, knowledgeCollection, 'slug', 50, true),
    databases.createBooleanAttribute(
      db,
      knowledgeCollection,
      'isActive',
      true,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'summary',
      1000,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'content',
      5000,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'imageUrl',
      150,
      false
    ),
    databases.createBooleanAttribute(
      db,
      knowledgeCollection,
      'featured',
      true,
      false
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'knowledgeCategoryId',
      36,
      true
    ),
  ]);

  // Indexes
  await Promise.all([
    databases.createIndex(
      db,
      knowledgeCollection,
      'slug_idx',
      IndexType.Unique,
      ['slug']
    ),
    databases.createIndex(
      db,
      knowledgeCollection,
      'title_summary_idx',
      IndexType.Fulltext,
      ['title', 'summary']
    ),
    databases.createIndex(
      db,
      knowledgeCollection,
      'featured_idx',
      IndexType.Key,
      ['featured']
    ),
    databases.createIndex(
      db,
      knowledgeCollection,
      'isActive_idx',
      IndexType.Key,
      ['isActive']
    ),
    databases.createIndex(
      db,
      knowledgeCollection,
      'categoryId_idx',
      IndexType.Key,
      ['knowledgeCategoryId']
    ),
    databases.createIndex(
      db,
      knowledgeCollection,
      'createdAt_idx',
      IndexType.Key,
      ['$createdAt']
    ),
  ]);
}
