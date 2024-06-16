import Image from "next/image";
import Logo from "@components/assets/images/intellizence_logo.jpg";
import { useRouter } from "next/router";

const TermsAndConditions = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="mx-auto p-8 max-w-5xl max-h-[90vh] overflow-y-auto">
        <h1 className="mt-10 mb-4 font-bold text-2xl">Terms and Conditions</h1>
        <p className="mb-4">
          These terms and conditions outline the rules and regulations for the
          use of Intellizence&apos;s Website.
        </p>
        <div className="mx-5 mb-4">
          <ol type="1">
            <li>
              Non-Commercial Use: The data purchased is strictly for personal or
              internal business use and must not be used for monetary gain or
              resale purposes.
            </li>
            <li>
              Source and Compliance: All data provided originates from publicly
              available sources and complies with relevant data privacy laws and
              regulations. We do not support the sale or purchase of
              confidential or personally identifiable information.
            </li>
            <li>
              Legal Compliance: You agree to use the data in accordance with
              applicable data protection and privacy laws. It is your
              responsibility to ensure that your use of the data does not
              infringe upon any laws or regulations.
            </li>
            <li>
              Prohibited Actions: Reselling or commercializing the purchased
              data is strictly prohibited. Violations may result in penalties,
              legal action, and termination of platform access.
            </li>
          </ol>
        </div>
        <p className="mb-4">
          By accepting these terms, you acknowledge and agree to adhere to these
          conditions. Failure to comply may result in penalties, legal action,
          and termination of access to our platform.
        </p>
      </div>
      <div className="flex justify-between mx-auto px-8 py-4 w-full max-w-5xl">
        <Image src={Logo} alt="logo" width={200} height={100} />
        <button
          onClick={handleBackClick}
          className="bg-blue-400 px-10 py-2 rounded max-w-max text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
