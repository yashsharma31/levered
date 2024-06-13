// Add to services/api/authService.ts

interface OAuthResponse {
  url: string; // Assuming the response contains a URL to redirect the user to
}

export async function initiateOAuthGoogle(
  redirectUri: string
): Promise<string | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    console.error("API base URL is not defined in environment variables.");
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/api/auth/oauth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ redirectUri }),
    });

    if (!response.ok) {
      throw new Error("Failed to initiate OAuth with Google");
    }

    const result: OAuthResponse = await response.json();
    return result.url; // The URL to redirect the user to for Google login
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const initiateOAuthGoogleRoute = async (redirectUri: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    // Construct the full URL for your OAuth API endpoint
    const oauthUrl = `${baseUrl}/api/auth/oauth/google?redirect_to=${encodeURIComponent(
      redirectUri
    )}`;

    // Direct the user to the OAuth URL
    window.location.href = oauthUrl;
  } catch (error) {
    console.error("Failed to initiate OAuth with Google:", error);
  }
};

export const initiateOAuthLinkedinRoute = async (redirectUri: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  try {
    // Construct the full URL for your OAuth API endpoint
    const oauthUrl = `${baseUrl}/api/auth/oauth/linkedin?redirect_to=${encodeURIComponent(
      redirectUri
    )}`;

    // Direct the user to the OAuth URL
    window.location.href = oauthUrl;
  } catch (error) {
    console.error("Failed to initiate OAuth with Linkedin:", error);
  }
};
