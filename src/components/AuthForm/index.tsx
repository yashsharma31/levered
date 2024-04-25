import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";

import {
  checkUserCountry,
  loginUser,
  signUpUser,
  verifyOtp,
} from "@components/services/authService";
import { initiateOAuthGoogleRoute } from "@components/services/oAuthGoogle";
import LogoBlack from "@components/assets/icons/logoBlack";
import GoogleLogo from "@components/assets/icons/googleLogo";
import { Loader } from "./Loader";

export const AuthFormWithTabs = () => {
  const router = useRouter();
  const [userStatus, setUserStatus] = useState("initial"); // "initial", "new", "existing"
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const currentHeading = () => {
    switch (userStatus) {
      case "initial":
        return "Enter your Email";
      case "new":
        return "Welcome! Please Sign Up";
      case "existing":
        return "Enter OTP to Log In";
      case "successLogin":
        return "Login Successful! Redirecting...";
      case "successRegistration":
        return "Registration Successful! Redirecting...";
      default:
        return "Authentication"; // A generic fallback heading
    }
  };

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      otp: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        userStatus === "new" && !value ? "Name is required" : null,
      otp: (value) =>
        userStatus === "existing" && !value ? "OTP is required" : null,
    },
  });

  useEffect(() => {
    setOtpSent(false); // Example state reset, adjust as needed
    setErrorMessage("");
    // Potentially other state resets based on your component's needs
  }, [userStatus]);

  const handleSubmit = async (values: typeof form.values) => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (userStatus === "initial") {
        const { status, message } = await loginUser({ email: values.email });

        if (status === "NEW_ACCOUNT") {
          setUserStatus("new");
        } else if (status === "OTP_SENT") {
          setUserStatus("existing");
        } else {
          setErrorMessage(message);
        }
      } else if (userStatus === "new") {
        const response = await signUpUser({
          email: values.email,
          name: values.name,
        });

        if (response.status === "SUCCESS") {
          setUserStatus("successRegistration");
          router.push(router.query.redirect as string);
        } else {
          setErrorMessage(response.message);
        }
      } else if (userStatus === "existing") {
        const response = await verifyOtp({
          email: values.email,
          otp: values.otp,
        });

        if (response.status === "SUCCESS") {
          setUserStatus("successLogin");
          router.push(router.query.redirect as string);
        } else {
          setErrorMessage(response.message);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthGoogle = async () => {
    const redirectUri = `${window.location.origin}`;
    if (!(await checkUserCountry())) {
      setErrorMessage("Not allowed for your region");
      return;
    }
    initiateOAuthGoogleRoute(redirectUri + (router.query.redirect as string));
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <div className="py-20 mx-auto max-w-max">
        {/* Logo component */}
        <LogoBlack />
      </div>
      <div className="flex border-b">
        <h2
          className={`flex-1 py-2 text-center ${
            userStatus === "new" || userStatus === "existing"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
        >
          {currentHeading()}
        </h2>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6 py-4">
        <input
          type="email"
          className="w-full p-3 border rounded-md"
          required
          placeholder="Email"
          {...form.getInputProps("email")}
          disabled={isLoading}
        />
        {userStatus === "new" && (
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            required
            placeholder="Name"
            {...form.getInputProps("name")}
            disabled={isLoading}
          />
        )}
        {userStatus === "existing" && (
          <input
            type="text"
            required
            className="w-full p-3 border rounded-md"
            placeholder="OTP"
            {...form.getInputProps("otp")}
            disabled={isLoading}
          />
        )}
        <button
          type="submit"
          className={clsx(
            "w-full p-3 bg-blue-500 flex items-center justify-center  text-white rounded-md",
            !isLoading
              ? "disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-35"
              : "disabled:cursor-not-allowed disabled:opacity-70"
          )}
          disabled={isLoading || !form.isDirty()}
        >
          {isLoading ? (
            <Loader />
          ) : userStatus === "initial" ? (
            "Login / Sign Up"
          ) : (
            "Submit"
          )}
        </button>
        {errorMessage && (
          <p className="text-red-500 w-full text-center">{errorMessage}</p>
        )}

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="w-full p-3 bg-black text-white rounded-md flex justify-center gap-6"
          onClick={handleOAuthGoogle}
        >
          {/* GoogleLogo component */}
          <GoogleLogo />
          <p>Sign in with Google</p>
        </button>
      </form>
    </div>
  );
};
