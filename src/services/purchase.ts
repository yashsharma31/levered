export const initiatePurchase = async (
  datasetId: string,
  setLoading: (loading: boolean) => void,
  onError: (message: string) => void,
  jwtToken: string
) => {
  setLoading(true);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const successUrl = `${window.location.origin}/${encodeURIComponent(
    datasetId
  )}/payment-successful`;
  const cancelUrl = `${window.location.origin}/${encodeURIComponent(
    datasetId
  )}/payment-cancelled`;

  try {
    const response = await fetch(
      `${baseUrl}/api/datasets/${datasetId}/purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include the JWT token in the Authorization header
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          dataset_id: datasetId,
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      // Redirect the user to Stripe's payment page
      window.location.href = data.stripe_url;
    } else {
      throw new Error(data.message || "Failed to initiate purchase");
    }
  } catch (error) {
    console.error("Purchase initiation error:", error);
    onError(
      error instanceof Error
        ? error.message
        : "An error occurred during purchase."
    );
  } finally {
    setLoading(false);
  }
};
