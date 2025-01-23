import env from '@/app/env';

import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId);

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, account, databases, storage };
