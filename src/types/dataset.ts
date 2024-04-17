export interface Dataset {
  id: number;
  slug: string;
  title: string;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
  subtitle: string;
  short_description: string;
  full_description: string;
  data_attributes: JSON;
  preview_url: string;
  dataset_updated_at: Date;
  price: number;
  vendor: {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export interface DatasetsResponseType {
  data: Dataset[];
  error?: string | null;
}
