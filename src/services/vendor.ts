import { VendorsResponseType } from "@components/types/vendors";

export const fetchVendors = async (): Promise<VendorsResponseType> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    return {
      vendorData: [],
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
        vendorData: [],
        error: "Failed to fetch vendors: " + response.statusText,
      };
    }
    const data = await response.json();

    return { vendorData: data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { vendorData: [], error: error.message };
    }

    return { vendorData: [], error: "An unexpected error occurred" };
  }
};
