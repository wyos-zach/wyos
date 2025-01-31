import { Permission, IndexType } from 'node-appwrite';
import { db, userSubscriptionsCollection } from '../../name';
import { databases } from '../config';

export default async function createUserSubscriptionsCollection() {
  await databases.createCollection(
    db,
    userSubscriptionsCollection,
    'User Subscriptions',
    [Permission.read('users'), Permission.write('users')]
  );

  // Required fields for subscription management
  await Promise.all([
    databases.createStringAttribute(
      db,
      userSubscriptionsCollection,
      'userId',
      255,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      db,
      userSubscriptionsCollection,
      'status',
      50,
      true
    ),
    databases.createStringAttribute(
      db,
      userSubscriptionsCollection,
      'priceId',
      255,
      true
    ),
    databases.createStringAttribute(
      db,
      userSubscriptionsCollection,
      'subscriptionId',
      255,
      true
    ),
    databases.createDatetimeAttribute(
      db,
      userSubscriptionsCollection,
      'currentPeriodEnd',
      true
    ),
    databases.createBooleanAttribute(
      db,
      userSubscriptionsCollection,
      'cancelAtPeriodEnd',
      false
    ),
  ]);

  // Create indexes for better query performance
  await Promise.all([
    databases.createIndex(
      db,
      userSubscriptionsCollection,
      'userId_idx',
      IndexType.Key,
      ['userId']
    ),
    databases.createIndex(
      db,
      userSubscriptionsCollection,
      'status_idx',
      IndexType.Key,
      ['status']
    ),
    databases.createIndex(
      db,
      userSubscriptionsCollection,
      'subscriptionId_idx',
      IndexType.Key,
      ['subscriptionId']
    ),
  ]);
}
