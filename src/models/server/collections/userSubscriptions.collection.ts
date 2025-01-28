import { Permission, IndexType } from 'node-appwrite';
import { db, userSubscriptionsCollectionId } from '../../name';
import { databases } from '../config';

export default async function createUserSubscriptionsCollection() {
  await databases.createCollection(
    db,
    userSubscriptionsCollectionId,
    'User Subscriptions',
    [Permission.read('users'), Permission.write('users')]
  );

  // Required fields for subscription management
  await Promise.all([
    databases.createStringAttribute(
      db,
      userSubscriptionsCollectionId,
      'userId',
      255,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      userSubscriptionsCollectionId,
      'status',
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      userSubscriptionsCollectionId,
      'priceId',
      255,
      true
    ),
    databases.createStringAttribute(
      db,
      userSubscriptionsCollectionId,
      'subscriptionId',
      255,
      true
    ),
    databases.createDatetimeAttribute(
      db,
      userSubscriptionsCollectionId,
      'currentPeriodEnd',
      true
    ),
    databases.createBooleanAttribute(
      db,
      userSubscriptionsCollectionId,
      'cancelAtPeriodEnd',
      false
    ),
  ]);

  // Create indexes for better query performance
  await Promise.all([
    databases.createIndex(
      db,
      userSubscriptionsCollectionId,
      'userId_index',
      IndexType.Key,
      ['userId']
    ),
    databases.createIndex(
      db,
      userSubscriptionsCollectionId,
      'status_index',
      IndexType.Key,
      ['status']
    ),
    databases.createIndex(
      db,
      userSubscriptionsCollectionId,
      'subscriptionId_index',
      IndexType.Key,
      ['subscriptionId']
    ),
  ]);
}
