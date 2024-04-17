export const fetchDownloadUrl = async (
  datasetId: string,
  sessionId: string,
  jwtToken: string
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const apiUrl = `${baseUrl}/api/datasets/${datasetId}/purchase/success?session_id=${sessionId}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data.download_url;
    } else {
      throw new Error(data.message || "Failed to fetch download URL");
    }
  } catch (error) {
    console.error("Error fetching download URL");
    throw error;
  }
};

export const notifyCancellation = async (
  datasetId: string,
  sessionId: string,
  jwtToken: string
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    await fetch(
      `${baseUrl}/api/datasets/${datasetId}/purchase/cancel?session_id=${sessionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log("Purchase cancellation notified to the backend.");
  } catch (error) {
    console.error("Error notifying backend about cancellation:", error);
    throw error;
  }
};
