import { VendorsResponseType } from "@components/types/vendors";

export const fetchVendors = async (): Promise<VendorsResponseType> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return {
      data: [],
      error: "API base URL is not defined in environment variables.",
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/datasets/vendors`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      return {
        data: [],
        error: "Failed to fetch vendors: " + response.statusText,
      };
    }
    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: [], error: error.message };
    }

    return { data: [], error: "An unexpected error occurred" };
  }
};
