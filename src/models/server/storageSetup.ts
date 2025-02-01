// src/models/server/storageSetup.ts
import { storage } from './config';
import {
  knowledgeAttachmentsBucket,
  resourcesAttachmentsBucket,
  categoryImagesBucket,
  categoryIconsBucket,
} from '../name';

let isStorageInitialized = false;

export default async function getOrCreateStorage() {
  if (isStorageInitialized) {
    return;
  }

  try {
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
      },
      {
        id: categoryImagesBucket,
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
      },
      {
        id: categoryIconsBucket,
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
      },
    ];

    for (const bucket of buckets) {
      try {
        await storage.getBucket(bucket.id);
      } catch {
        await storage.createBucket(
          bucket.id,
          bucket.name,
          ['read("any")'],
          false,
          undefined,
          undefined,
          bucket.allowedFileExtensions
        );
      }
    }

    isStorageInitialized = true;
  } catch (error) {
    console.error('Error setting up storage:', error);
    throw error;
  }
}
