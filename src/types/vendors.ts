export interface VendorsType {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface VendorsResponseType {
  vendorData: VendorsType[];
  error?: string | null;
}
