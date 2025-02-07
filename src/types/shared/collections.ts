export type CollectionConfig = {
  id: string;
  name: string;
  attributes: AttributeConfig[];
  indexes: IndexConfig[];
};

export type AttributeConfig = {
  name: string;
  type: 'string' | 'boolean' | 'integer' | 'float' | 'enum';
  size?: number;
  required: boolean;
  default?: unknown;
};

export type IndexConfig = {
  id: string;
  type: 'key' | 'unique' | 'fulltext';
  attributes: string[];
  orders?: ('asc' | 'desc')[];
};
