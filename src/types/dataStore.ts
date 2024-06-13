export interface DateStoreType {
  id: string;
  slug: string;
  title: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
  subtitle: string;
  short_description: string;
  full_description: string;
  data_attributes: {};
  preview_url: string;
  dataset_updated_at: Date;
  price: number;
  vendor: {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export interface DateStoreResponseType {
  data: DateStoreType | null;
  error?: string | number | null;
}
