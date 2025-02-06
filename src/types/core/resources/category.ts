export interface ResourceCategory {
  $id: string;
  name: string;
  slug: string;
  // Optionally, a description, icon, or image may be provided
  description?: string;
  isActive: boolean;
  imageUrl?: string;
  icon?: string;
  $createdAt: string;
  $updatedAt: string;
}
