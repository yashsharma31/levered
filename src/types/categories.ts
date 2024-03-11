export interface CategoriesType {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface CategoriesResponseType {
  data: CategoriesType[];
  error?: string | null;
}
