// services/api/authService.ts
import { fetchAPI } from "@components/utils/helper";
import Cookie from "js-cookie";

interface User {
  // Define user properties as needed.
}

interface AuthResponse {
  jwt: string;
  user: User;
}

interface ServiceResponse {
  message: string;
  status: "SUCCESS" | "ERROR" | "OTP_SENT" | "NEW_ACCOUNT";
  authResponse?: AuthResponse;
}

interface LoginAuthRequestData {
  email: string;
  otp?: string;
}

interface SignUpAuthRequestData {
  email: string;
  name: string;
}

interface OtpVerificationRequestData {
  email: string;
  otp: string;
}

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export async function checkUserCountry(): Promise<boolean> {
  try {
    const response = await fetchAPI<IPInfo | null>(
      "https://ipinfo.io/json",
      {}
    );
    console.log("IP info response:", response);
    if (response.body && response.body.country === "US") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to fetch IP info:", error);
    return false; // Assume not US in case of failure
  }
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// Type guard to check if a value is an object (and not null)
function isObject(value: any): value is Record<string, any> {
  return typeof value === "object" && value !== null;
}

async function handleApiResponse<T>(
  promise: Promise<{ body: T | null; status: number }>
): Promise<ServiceResponse> {
  try {
    const { body, status } = await promise;
    // Now using isObject to safely use the 'in' operator
    if (isObject(body)) {
      switch (status) {
        case 200:
          // Success: OTP sent or user logged in
          if ("jwt" in body && typeof body.jwt === "string") {
            Cookie.set("levered_jwt", body.jwt, { expires: 7 });
            return {
              message: "Login successful",
              status: "SUCCESS",
            };
          }
          return {
            message: body.message || "OTP sent via email",
            status: "OTP_SENT",
          };

        case 400:
          // Incorrect OTP entered
          return {
            message: body.message || "Incorrect OTP entered",
            status: "ERROR",
          };

        case 404:
          // No account exists
          return {
            message:
              "We don't have an account with this email address. Let's create one.",
            status: "NEW_ACCOUNT",
          };

        default:
          // Handle other unexpected statuses
          return {
            message: body.message || "An unexpected error occurred",
            status: "ERROR",
          };
      }
    } else {
      // Handle case where body is not an object (should not typically happen if API is consistent)

      return { message: "Response format is unexpected", status: "ERROR" };
    }
  } catch (err) {
    return {
      message: "Something went wrong. Try Again.",
      status: "ERROR",
    };
  }
}

export async function loginUser(
  data: LoginAuthRequestData
): Promise<ServiceResponse> {
  if (!(await checkUserCountry())) {
    return { message: "Not allowed for your region", status: "ERROR" };
  }
  if (!baseUrl) throw new Error("API base URL is not defined.");
  return handleApiResponse(
    fetchAPI<AuthResponse | { message: string }>(
      `${baseUrl}/api/auth/login`,
      data
    )
  );
}

export async function signUpUser(
  data: SignUpAuthRequestData
): Promise<ServiceResponse> {
  if (!(await checkUserCountry())) {
    return { message: "Not allowed for your region", status: "ERROR" };
  }
  if (!baseUrl) throw new Error("API base URL is not defined.");
  return handleApiResponse(
    fetchAPI<AuthResponse | { message: string }>(
      `${baseUrl}/api/auth/users`,
      data
    )
  );
}

export async function verifyOtp(
  data: OtpVerificationRequestData
): Promise<ServiceResponse> {
  if (!(await checkUserCountry())) {
    return { message: "Not allowed for your region", status: "ERROR" };
  }
  if (!baseUrl) throw new Error("API base URL is not defined.");
  return handleApiResponse(
    fetchAPI<AuthResponse>(`${baseUrl}/api/auth/verify-otp`, data)
  );
}
