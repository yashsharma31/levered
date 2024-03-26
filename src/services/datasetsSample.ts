import { Dataset } from "@components/types/datasetSample";

export async function fetchDatasetPreview(
  id: string | string[] | undefined
): Promise<{ data: Dataset | null; error: string | null }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return {
      data: null,
      error: "API base URL is not defined in environment variables.",
    };
  }

  let apiUrl = "?";

  if (id) {
    apiUrl = `${baseUrl}/api/datasets/${id}/preview`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data: Dataset = await response.json();

    return { data, error: null };
  } catch (error: any) {
    console.error("Failed to fetch data:", error.message);
    return { data: null, error: error.message || "An error occurred" };
  }
}
