import { BoughtDatasetsResponseType } from "@components/types/dataset";

export const fetchBoughtDatasets = async (
  jwtToken: string
): Promise<BoughtDatasetsResponseType> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return {
      ids: [],
      error: "API base URL is not defined in environment variables.",
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/datasets/purchased`, {
      method: "GET",

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      return {
        ids: [],
        error: "Failed to fetch datasets: " + response.statusText,
      };
    }

    const data = await response.json();
    const ids = data.map((dataset: any) => dataset.id);
    return { ids, error: null };
  } catch (error) {
    console.error("Error fetching datasets:", error);
    console.log("<><><>Data", error);

    if (error instanceof Error) {
      return { ids: [], error: error.message };
    }

    return { ids: [], error: "An unexpected error occurred" };
  }
};
