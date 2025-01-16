'use server';

import { Client, Account, ID } from 'node-appwrite';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!); // Server SDK requires an API key

const account = new Account(client);

export async function signUpWithEmail(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    const user = await account.create(ID.unique(), email, password, name);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error };
  }
}
