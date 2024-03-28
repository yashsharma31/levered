export async function fetchDatasetDownloadUrl(
  id: string | string[] | undefined
): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    console.error("API base URL is not defined in environment variables.");
    return null;
  }

  if (!id) {
    console.error("Dataset ID is required.");
    return null;
  }

  const apiUrl = `${baseUrl}/api/datasets/${id}/preview/download`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching download URL: ${response.status}`);
    }

    const data = await response.json();
    return data.download_url;
  } catch (error: any) {
    console.error("Failed to fetch download URL:", error.message);
    return null;
  }
}
