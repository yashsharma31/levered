export const fetchUserData = async (authToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/users/me`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );

    if (!response.ok) {
      return {
        data: null,
        error: "Failed to fetch user data: " + response.statusText,
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching user data:", error);

    if (error instanceof Error) {
      return { data: null, error: error.message };
    }

    return { data: null, error: "An unexpected error occurred" };
  }
};
