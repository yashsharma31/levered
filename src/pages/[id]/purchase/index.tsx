import { GetServerSideProps } from "next";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

import { ACCESS_TOKEN } from "@components/utils/constants";
import { getCookie } from "@components/utils/tokenHelper";
import { initiatePurchase } from "@components/services/purchase";
import Redirecting from "../../../assets/images/redirect.gif";
import Image from "next/image";
import LogoBlack from "@components/assets/icons/logoBlack";
import StripeLogo from "@components/assets/icons/stripeLogo";
import { Loader } from "@mantine/core";

const PaymentGateway = () => {
  const router = useRouter();
  const { id } = router.query; // Assuming the dataset ID comes from the URL
  const [loading, setLoading] = useState(false);
  const jwtToken = Cookie.get("levered_jwt");

  useEffect(() => {
    if (id) {
      initiatePurchase(
        id as string,
        setLoading,
        handleError,
        jwtToken as string
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, jwtToken]);

  // Define an error handling function
  const handleError = (message: string) => {
    alert(message);
    router.push(`/${id}`);
    // console.error(message);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      {/* Content and additional logic for your purchase page */}
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center justify-center h-80 max-h-max">
          <LogoBlack width={200} height={800} />
          {loading ? (
            <Loader width={160} height={160} />
          ) : (
            <Image
              src={Redirecting}
              alt="redirecting"
              width={100}
              height={100}
              quality={100}
            />
          )}
          <StripeLogo width={200} height={800} />
        </div>
        <p className="text-xl font-semibold p-6">Redirecting to payment...</p>
        <p>Please wait</p>
      </div>
    </div>
  );
};

export default PaymentGateway;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = getCookie(ACCESS_TOKEN, context.req.headers.cookie);

  if (!authToken) {
    const originalUrl = `${context.resolvedUrl}`;
    const loginRedirectUrl = `/login?redirect=${encodeURIComponent(
      originalUrl
    )}`;

    if (context.query.jwt) {
      setCookie(context, "levered_jwt", context.query.jwt as string, {
        maxAge: 7 * 24 * 60 * 60, // Expires in 7 days
        path: "/",
      });
      return {
        props: {},
      };
    }

    return {
      redirect: {
        destination: loginRedirectUrl,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
