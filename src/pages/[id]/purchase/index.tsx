import { ACCESS_TOKEN } from "@components/utils/constants";
import { getCookie } from "@components/utils/tokenHelper";
import { GetServerSideProps } from "next";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

const PaymentGateway = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Payment Gateway</h1>
      <p>Jwt Key</p> <span>{router.query.id}</span>
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
