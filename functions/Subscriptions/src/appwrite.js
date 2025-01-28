import { Client, Users, Databases } from 'node-appwrite';

const LabelsSubscriber = 'subscriber';

class AppwriteService {
  constructor(apiKey) {
    const client = new Client();
    client
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(apiKey);

    this.users = new Users(client);
    this.databases = new Databases(client);
  }

  /**
   * @param {string} userId
   * @param {import('stripe').Stripe.Subscription} subscription
   * @returns {Promise<void>}
   */
  async updateSubscription(userId, subscription) {
    await this.databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      'user-subscriptions',
      userId,
      {
        subscriptionStatus: subscription.status,
        priceId: subscription.items.data[0].price.id,
        subscriptionId: subscription.id,
        currentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ).toISOString(),
      }
    );
  }

  /**
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async deleteSubscription(userId) {
    await this.databases.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      'user-subscriptions',
      userId,
      {
        subscriptionStatus: 'canceled',
        priceId: null,
        subscriptionId: null,
        currentPeriodEnd: null,
      }
    );
  }

  /**
   * @param {string} userId
   * @returns {Promise<void>}
   */
  async createSubscription(userId) {
    const labels = (await this.users.get(userId)).labels;
    labels.push(LabelsSubscriber);

    await this.users.updateLabels(userId, labels);
  }
}

export default AppwriteService;
