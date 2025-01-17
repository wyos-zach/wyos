'use server';

import { Client, Users } from 'node-appwrite';

const getAppwriteConfig = () => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !apiKey) {
    throw new Error('Missing Appwrite environment variables');
  }

  return { endpoint, projectId, apiKey };
};

const { endpoint, projectId, apiKey } = getAppwriteConfig();

const serverClient = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const users = new Users(serverClient);

export { users };
