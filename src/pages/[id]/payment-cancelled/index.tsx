// pages/payment-cancelled.js
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { notifyCancellation } from "@components/services/payment";
import PaymentError from "../../../assets/images/cancel-payment.jpg";
import Image from "next/image";
import Link from "next/link";

const PaymentCancelled = () => {
  const router = useRouter();
  const { session_id, id: dataset_id } = router.query;
  const jwtToken = Cookie.get("levered_jwt");

  useEffect(() => {
    if (session_id && dataset_id && jwtToken) {
      notifyCancellation(
        dataset_id as string,
        session_id as string,
        jwtToken as string
      )
        .then(() => {
          console.log("Cancellation process completed.");
          // Handle any additional logic here, such as updating UI or redirecting
        })
        .catch(() => {
          console.error("Failed to process cancellation");
          // Handle error, such as displaying an error message to the user
        });
    }
  }, [session_id, dataset_id, jwtToken]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Image
        src={PaymentError}
        alt="Payment Cancelled"
        width={400}
        height={400}
      />
      <h1 className="text-3xl font-semibold py-4">Payment Cancelled</h1>
      <p>
        Your payment was cancelled. If this was an error, please{" "}
        <Link href={"/"} className="text-blue-500 hover:underline">
          try again.
        </Link>
      </p>
    </div>
  );
};

export default PaymentCancelled;
