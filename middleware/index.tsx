import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { AppProps } from "next/app";
import React from "react";

const withAuth = (WrappedComponent: React.ComponentType<AppProps>) => {
  const Wrapper = (props: AppProps) => {
    const router = useRouter();
    const isAuthenticated =
      typeof window !== "undefined" && !!Cookies.get("levered_jwt");

    useEffect(() => {
      if (isAuthenticated && router.pathname === "/login") {
        router.replace("/");
      }
    }, [isAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
