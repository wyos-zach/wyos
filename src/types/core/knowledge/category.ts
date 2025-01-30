export interface KnowledgeCategory {
  $id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  imageUrl?: string;
  icon?: string;
  parentId?: string;
  $createdAt: string;
  $updatedAt: string;
}

export interface KnowledgeCategoryTree extends KnowledgeCategory {
  subcategories: KnowledgeCategory[];
  knowledgeCount: number;
}
