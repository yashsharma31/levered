import { ACCESS_TOKEN } from "@components/utils/constants";
import { getCookie } from "@components/utils/tokenHelper";
import { GetServerSideProps } from "next";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initiatePurchase } from "@components/services/purchase";
import Cookie from "js-cookie";

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Content and additional logic for your purchase page */}
      <p>Redirecting to payment...</p>
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
