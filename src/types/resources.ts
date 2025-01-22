export interface Resource {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categoryId: string;
  metadata: {
    featured: boolean;
    publishedAt: Date;
    updatedAt: Date;
    imageUrl?: string;
    downloadUrl?: string;
    fileType?: string;
  };
}

export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface ResourceResponse {
  entries: Resource[];
  hasMore: boolean;
  nextPage: number;
}

export interface ResourceCardProps {
  title: string;
  summary: string;
  categoryId: string;
  metadata: {
    featured: boolean;
    publishedAt: Date;
    imageUrl?: string;
    downloadUrl?: string;
    fileType?: string;
  };
  onClick?: () => void;
}

export interface ResourceGridProps {
  categoryId?: string;
  searchQuery?: string;
}
