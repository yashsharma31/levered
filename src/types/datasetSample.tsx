export interface DatasetRow {
  company_name: string;
  layoff_date: string;
  layoff_count: number;
  reason: string;
  source: string;
}

export interface Dataset {
  columns: {
    [key: string]: string;
  };
  rows: DatasetRow[];
}
