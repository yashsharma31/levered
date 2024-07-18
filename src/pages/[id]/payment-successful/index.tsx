import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { fetchDownloadUrl } from "@components/services/payment";
import LogoBlack from "@components/assets/icons/logoBlack";
import { Loader } from "@mantine/core";
import Image from "next/image";
import Success from "@components/assets/images/success-payment.gif";
import { Header } from "@components/components/DataStore/Header";
import { Footer } from "@components/components/DataStore/Footer";
import { GetServerSideProps } from "next";
import { getCookie } from "@components/utils/tokenHelper";
import { ACCESS_TOKEN } from "@components/utils/constants";
import { fetchUserData } from "@components/services/userData";

interface PaymentSuccessPageProps {
  isLoggedIn: boolean;
  userData?: {
    email: string;
    name: string;
    is_active: boolean;
    company: string | null;
    address_house_num: string | null;
    address_street: string | null;
    address_city: string | null;
    address_state: string | null;
    address_country: string | null;
    address_zip: string | null;
  };
}

const PaymentSuccess = ({ isLoggedIn, userData }: PaymentSuccessPageProps) => {
  const router = useRouter();
  const { session_id, id: dataset_id } = router.query;
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const jwtToken = Cookie.get("levered_jwt");
  const [counter, setCounter] = useState(5); // Countdown starts from 5 seconds

  useEffect(() => {
    let timer: any; // Declare timer outside so it's accessible for clearInterval
    if (session_id && dataset_id && jwtToken) {
      fetchDownloadUrl(
        dataset_id as string,
        session_id as string,
        jwtToken as string
      )
        .then((url) => {
          setDownloadUrl(url);
          // Start the countdown
          timer = setInterval(() => {
            setCounter((prevCounter) => {
              if (prevCounter <= 1) {
                clearInterval(timer); // Stop the countdown
                // Start the download if no error
                if (url && !error) {
                  window.location.href = url;
                }
                return 0;
              }
              return prevCounter - 1;
            });
          }, 1000); // Decrement counter every second
        })
        .catch((err) => {
          setError(err.message);
          if (timer) clearInterval(timer); // Ensure the timer is cleared on error
        });
    }
    return () => {
      if (timer) clearInterval(timer); // Clear the interval when the component unmounts
    };
  }, [session_id, dataset_id, jwtToken, error]);

  return (
    <div className="w-screen">
      <div className="bg-[#4F87F5]">
        <Header isLoggedIn={isLoggedIn} userData={userData} />
      </div>
      <div className="flex flex-col justify-center items-center mt-40 w-full h-full">
        <div className="mb-16 px-4 py-2">
          <LogoBlack width={150} />
        </div>
        {downloadUrl ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src={Success}
              alt="success payment"
              width={100}
              height={100}
              quality={100}
            />
            <p className="font-semibold text-lg">
              Payment successful! Your download will start in {counter} seconds.
            </p>
            <a
              href={downloadUrl}
              className="bg-blue-500 hover:shadow-lg px-10 py-3 border rounded-lg text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Dataset
            </a>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6">
            <Loader />
            <p className="font-semibold text-lg">Verifying payment...</p>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  PaymentSuccessPageProps
> = async (context) => {
  const authToken = getCookie(ACCESS_TOKEN, context.req.headers.cookie);
  const isLoggedIn = !!authToken;

  const fetchUserPromise = authToken
    ? fetchUserData(authToken)
    : Promise.resolve({ data: null, error: null });
  let userData = null;
  if (authToken) {
    userData = (await fetchUserPromise).data;
    return {
      props: {
        isLoggedIn,
        userData,
      },
    };
  }

  return {
    props: {
      isLoggedIn,
    },
  };
};

export default PaymentSuccess;
