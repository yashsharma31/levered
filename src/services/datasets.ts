import { DatasetsResponseType } from "@components/types/dataset";

export const fetchDatasets = async (
  categories?: number,
  vendorId?: number
): Promise<DatasetsResponseType> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return {
      data: [],
      error: "API base URL is not defined in environment variables.",
    };
  }

  // Initializing the query string
  let queryString = "?";

  // Handling categories as either an array or a single value
  if (categories) {
    queryString += `categories=${categories}&`;
  }

  // Adding vendorId to the query string if it's provided
  if (vendorId) queryString += `vendor=${vendorId}&`;

  // Removing the trailing "&" if it exists
  queryString = queryString.endsWith("&")
    ? queryString.slice(0, -1)
    : queryString;

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
