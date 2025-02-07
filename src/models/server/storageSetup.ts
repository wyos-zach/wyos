import { Client, Storage, Permission, Role } from 'node-appwrite';
import {
  knowledgeAttachmentsBucket,
  resourcesAttachmentsBucket,
  knowledgeCategoryImagesBucket,
  knowledgeCategoryIconsBucket,
} from '../name';

// Initialize Appwrite Client
const client = new Client();

if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 
    !process.env.APPWRITE_API_KEY) {
  throw new Error('Missing required Appwrite environment variables');
}

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

let isStorageInitialized = false;

export default async function getOrCreateStorage() {
  if (isStorageInitialized) return;

  try {
    // Define your buckets with proper configuration.
    const buckets = [
      {
        id: knowledgeAttachmentsBucket,
        name: 'Knowledge Attachments',
        allowedFileExtensions: [
          'jpg',
          'jpeg',
          'png',
          'gif',
          'svg',
          'webp',
          'heic',
        ],
        maxFileSize: 5 * 1024 * 1024, // 5MB in bytes
      },
      {
        id: resourcesAttachmentsBucket,
        name: 'Resource Attachments',
        allowedFileExtensions: [
          'jpg',
          'jpeg',
          'png',
          'gif',
          'svg',
          'webp',
          'heic',
        ],
        maxFileSize: 5 * 1024 * 1024,
      },
      {
        id: knowledgeCategoryImagesBucket,
        name: 'Category Images',
        allowedFileExtensions: [
          'jpg',
          'jpeg',
          'png',
          'gif',
          'svg',
          'webp',
          'heic',
        ],
        maxFileSize: 5 * 1024 * 1024,
      },
      {
        id: knowledgeCategoryIconsBucket,
        name: 'Category Icons',
        allowedFileExtensions: [
          'jpg',
          'jpeg',
          'png',
          'gif',
          'svg',
          'webp',
          'heic',
          'ico',
          'icns',
        ],
        maxFileSize: 5 * 1024 * 1024,
      },
    ];

    // For each bucket, check if it exists; if not, create it.
    for (const bucket of buckets) {
      try {
        await storage.getBucket(bucket.id);
      } catch {
        // If bucket does not exist, create it.
        // The permissions must be provided as an array of strings.
        try {
          // Create bucket first
          await storage.createBucket(
            bucket.id,
            bucket.name,
            [Permission.read(Role.any())]
          );

          // Then update its configuration
          await storage.updateBucket(
            bucket.id,
            bucket.name,
            [Permission.read(Role.any())],
            undefined, // fileSecurity
            true, // enabled
            bucket.maxFileSize,
            bucket.allowedFileExtensions,
            undefined, // compression
            true, // encryption
            true  // antivirus
          );
          console.warn(`Created bucket: ${bucket.name}`);
        } catch (error) {
          console.error(`Error creating bucket ${bucket.name}:`, error);
        }
      }
    }

    isStorageInitialized = true;
  } catch (error) {
    console.error('Error setting up storage:', error);
    throw error;
  }
}
