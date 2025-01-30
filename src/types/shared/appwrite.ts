export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

export interface AppwriteResponse<T> {
  documents: T[];
  total: number;
}
