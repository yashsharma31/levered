import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { fetchDownloadUrl } from "@components/services/payment";
import LogoBlack from "@components/assets/icons/logoBlack";
import { Loader } from "@mantine/core";
import Image from "next/image";
import Success from "@components/assets/images/success-payment.gif";

const PaymentSuccess = () => {
  const router = useRouter();
  const { session_id, id: dataset_id } = router.query;
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const jwtToken = Cookie.get("levered_jwt");
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    let timer: any;
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
    <div className="w-screen h-screen">
      <div className="flex w-full flex-col h-full items-center justify-center">
        <div className="px-4 py-2 mb-16">
          <LogoBlack width={150} />
        </div>
        {downloadUrl ? (
          <div className="flex items-center justify-center flex-col gap-4">
            <Image
              src={Success}
              alt="success payment"
              width={100}
              height={100}
              quality={100}
            />
            <p className="text-lg font-semibold">
              Payment successful! Your download will start in {counter} seconds.
            </p>
            <a
              href={downloadUrl}
              className="border px-10 py-3 bg-blue-500 text-white hover:shadow-lg rounded-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Dataset
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6">
            <Loader />
            <p className="text-lg font-semibold">Verifying payment...</p>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};

export default PaymentSuccess;
