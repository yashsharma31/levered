import { GetServerSideProps } from "next";

import { AuthFormWithTabs } from "@components/components/AuthForm";
import { ACCESS_TOKEN } from "@components/utils/constants";
import { getCookie } from "@components/utils/tokenHelper";

export default function AuthPage() {
  return <AuthFormWithTabs />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = getCookie(ACCESS_TOKEN, context.req.headers.cookie);

  const isLoggedIn = !!authToken;

  if (isLoggedIn) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
