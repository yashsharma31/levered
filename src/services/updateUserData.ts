interface FormValues {
  name: string;
  email: string;
  company: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export async function updateUserAccountData(
  values: FormValues,
  your_jwt_token: string
): Promise<{ data: any | null; error: string | null }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return {
      data: null,
      error: "API base URL is not defined in environment variables.",
    };
  }

  const apiUrl = `${baseUrl}/api/auth/users`;

  try {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${your_jwt_token}`, // replace with actual JWT token
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Error updating user data: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error: any) {
    console.error("Failed to update user data:", error.message);
    return { data: null, error: error.message || "An error occurred" };
  }
}
