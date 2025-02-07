export interface KnowledgeCategory {
  $id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  imageUrl?: string;
  iconUrl?: string;
  mainCategoryId?: string;
  $createdAt: string;
  $updatedAt: string;
}
