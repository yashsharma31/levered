import { useRouter } from "next/router";

const PaymentGateway = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Payment Gateway</h1>
      <p>Jwt Key</p> <span>{router.query.jwt}</span>
    </div>
  );
};

export default PaymentGateway;
