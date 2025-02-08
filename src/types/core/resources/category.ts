export type ResourceCategoryType = 'app' | 'book' | 'course' | 'podcast' | 'software' | 'youtube';

export interface ResourceCategory {
  $id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  mainCategoryId: string;
  type: ResourceCategoryType;
  $createdAt: string;
  $updatedAt: string;
}
