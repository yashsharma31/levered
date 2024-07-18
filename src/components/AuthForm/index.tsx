import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import Image from "next/image";

import {
  checkUserCountry,
  loginUser,
  signUpUser,
  verifyOtp,
} from "@components/services/authService";
import {
  initiateOAuthGoogleRoute,
  initiateOAuthLinkedinRoute,
} from "@components/services/oAuth";
import LogoBlack from "@components/assets/icons/logoBlack";
import GoogleLogo from "@components/assets/icons/googleLogo";
import { Loader } from "./Loader";
import LinkedInLogo from "@components/assets/icons/linkeinLogo";
import Logo from "../../assets/images/intellizence_logo.jpg";

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
        return "Enter CODE to Login";
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
      company: "",
      address_house_num: "",
      address_street: "",
      address_city: "",
      address_state: "",
      address_country: "",
      address_zip: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      name: (value) =>
        userStatus === "new" && !value ? "Name is required" : null,
      otp: (value) =>
        userStatus === "existing" && !value ? "CODE is required" : null,
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
          if (router.query.redirect) {
            router.push(router.query.redirect as string);
          }
          router.push("/");
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
      setErrorMessage("Stay tuned, coming in your region soon");
      return;
    }
    const redirectTo =
      router.query.redirect === undefined
        ? redirectUri
        : ((redirectUri + router.query.redirect) as string);
    initiateOAuthGoogleRoute(redirectTo);
  };

  const handleOAuthLinkedin = async () => {
    const redirectUri = `${window.location.origin}`;
    if (!(await checkUserCountry())) {
      setErrorMessage("Stay tuned, coming in your region soon");
      return;
    }
    const redirectTo =
      router.query.redirect === undefined
        ? redirectUri
        : ((redirectUri + router.query.redirect) as string);

    initiateOAuthLinkedinRoute(redirectTo);
  };

  return (
    <div className="mx-auto my-10 max-w-xl">
      <div className="mx-auto py-16 max-w-max">
        {/* Logo component */}
        <Image
          onClick={() => router.push("/")}
          src={Logo}
          alt="logo"
          width={200}
          height={100}
          className="cursor-pointer"
        />
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
          className="p-3 border rounded-md w-full"
          required
          placeholder="Email*"
          {...form.getInputProps("email")}
          disabled={isLoading}
        />
        {userStatus === "new" && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                required
                placeholder="Name*"
                {...form.getInputProps("name")}
                disabled={isLoading}
              />
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                placeholder="Company"
                {...form.getInputProps("company")}
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                placeholder="House No."
                {...form.getInputProps("address_house_num")}
                disabled={isLoading}
              />
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                placeholder="Street"
                {...form.getInputProps("address_street")}
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                placeholder="City"
                {...form.getInputProps("address_city")}
                disabled={isLoading}
              />
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                placeholder="State"
                {...form.getInputProps("address_state")}
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                placeholder="Country"
                {...form.getInputProps("address_country")}
                disabled={isLoading}
              />
              <input
                type="text"
                className="p-3 border rounded-md w-full"
                placeholder="Zip Code"
                {...form.getInputProps("address_zip")}
                disabled={isLoading}
              />
            </div>
          </div>
        )}
        {userStatus === "existing" && (
          <input
            type="text"
            required
            className="p-3 border rounded-md w-full"
            placeholder="CODE"
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
          <p className="w-full text-center text-red-500">{errorMessage}</p>
        )}

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-gray-300 border-t"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-gray-300 border-t"></div>
        </div>

        <button
          type="button"
          className="flex justify-center gap-6 bg-black hover:shadow-lg p-3 rounded-md w-full text-white"
          onClick={handleOAuthGoogle}
        >
          {/* GoogleLogo component */}
          <GoogleLogo />
          <p>Sign in with Google</p>
        </button>
        <button
          type="button"
          className="flex justify-center gap-6 border-[#0077B5] border-2 bg-white hover:shadow-lg p-3 rounded-md w-full text-[#0077B5]"
          onClick={handleOAuthLinkedin}
        >
          {/* GoogleLogo component */}
          <LinkedInLogo width={24} height={24} />
          <p>Sign in with LinkedIn</p>
        </button>
      </form>
    </div>
  );
};
