import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { fetchDownloadUrl } from "@components/services/payment";

const PaymentSuccess = () => {
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
    <div>
      {downloadUrl ? (
        <div>
          <p>
            Payment successful! Your download will start in {counter} seconds.
          </p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Download Dataset
          </a>
        </div>
      ) : (
        <p>Verifying payment...</p>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default PaymentSuccess;
