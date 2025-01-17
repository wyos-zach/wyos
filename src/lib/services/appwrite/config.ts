import { Client, Account } from 'appwrite';

const getAppwriteConfig = () => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    throw new Error('Missing Appwrite environment variables');
  }

  return { endpoint, projectId };
};

const { endpoint, projectId } = getAppwriteConfig();

export const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
