import { Permission } from 'node-appwrite';
import { db, knowledgeCollection } from '../../name';
import { databases } from '../config';

export default async function createKnowledgeCollection() {
  await databases.createCollection(
    db,
    knowledgeCollection,
    knowledgeCollection,
    [Permission.read('any'), Permission.read('users')]
  );

  await Promise.all([
    databases.createStringAttribute(db, knowledgeCollection, 'title', 64, true),
    databases.createStringAttribute(db, knowledgeCollection, 'slug', 64, true),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'summary',
      2048,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'content',
      16384,
      true
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
      'seoDescription',
      256,
      false
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'imageUrl',
      2048,
      false
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'categoryId',
      36,
      true
    ),
    databases.createStringAttribute(
      db,
      knowledgeCollection,
      'userId',
      36,
      true
    ),
  ]);

  console.log('Knowledge collection created');
}

/*
await Promise.all([
  databases.createIndex(
    db,
    knowledgeCollection,
    'title_search',
    IndexType.Fulltext,
    ['title', 'summary']
  ),
  databases.createIndex(
    db,
    knowledgeCollection,
    'category_lookup',
    IndexType.Key,
    ['categoryId']
  ),
  databases.createIndex(
    db,
    knowledgeCollection,
    'featured_filter',
    IndexType.Key,
    ['featured']
  ),
  databases.createIndex(
    db,
    knowledgeCollection,
    'created_sort',
    IndexType.Key,
    ['createdAt']
  ),
]);*/
