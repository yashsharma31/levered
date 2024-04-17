import { DateStoreResponseType } from "@components/types/dataStore";

export const fetchDataStore = async (
  dataStore?: string
): Promise<DateStoreResponseType> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return {
      data: null,
      error: "API base URL is not defined in environment variables.",
    };
  }

  // Initializing the query string
  let queryString = "?";

  // Handling categories as either an array or a single value
  if (dataStore) {
    queryString = dataStore;
  }

  try {
    const response = await fetch(`${baseUrl}/api/datasets/${queryString}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        data: null,
        error: "Failed to fetch datasets: " + response.statusText,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching datasets:", error);

    if (error instanceof Error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: "An unexpected error occurred" };
  }
};
