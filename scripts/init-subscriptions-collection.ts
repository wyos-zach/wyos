import createUserSubscriptionsCollection from '../src/models/server/collections/userSubscriptions.collection';

async function main() {
  try {
    await createUserSubscriptionsCollection();
    console.log('Successfully created user subscriptions collection');
  } catch (error) {
    console.error('Failed to create user subscriptions collection:', error);
  }
}

main();
