import { DatasetsResponseType } from "@components/types/dataset";

export const fetchDatasets = async (
  categoryId?: number,
  vendorId?: number
): Promise<DatasetsResponseType> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return {
      data: [],
      error: "API base URL is not defined in environment variables.",
    };
  }

  let queryString = "?";
  if (categoryId) queryString += `category_id=${categoryId}&`;
  if (vendorId) queryString += `vendor_id=${vendorId}`;

  try {
    const response = await fetch(`${baseUrl}/api/datasets/${queryString}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        data: [],
        error: "Failed to fetch datasets: " + response.statusText,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching datasets:", error);

    if (error instanceof Error) {
      return { data: [], error: error.message };
    }

    return { data: [], error: "An unexpected error occurred" };
  }
};
