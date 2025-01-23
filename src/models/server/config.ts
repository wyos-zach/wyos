import env from '@/app/env';

import { Client, Databases, Storage, Users } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apikey);

const databases = new Databases(client);
const users = new Users(client);
const storage = new Storage(client);

export { client, users, databases, storage };
