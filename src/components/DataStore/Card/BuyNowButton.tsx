import { Fragment, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter } from "next/router";

const BuyNowButton = ({
  isLoggedIn,
  handleBuyNowClick,
}: {
  isLoggedIn: boolean;
  handleBuyNowClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleBuyNow = () => {
    if (isLoggedIn) {
      setIsOpen(true);
    } else {
      router.push("/login");
    }
  };

  const handleAccept = () => {
    setIsOpen(false);
    handleBuyNowClick();
    // Proceed with the buy now action
  };

  return (
    <Fragment>
      <button
        onClick={handleBuyNow}
        className="bg-blue-500 hover:shadow-md px-8 py-4 rounded-full w-full text-lg text-white"
      >
        Buy Now
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-35 p-4 w-screen">
          <DialogPanel className="space-y-4 bg-white p-12 border max-w-2xl">
            <DialogTitle className="font-bold">
              Terms and Conditions
            </DialogTitle>
            <Description>
              Please accept our Terms and Conditions to proceed with your
              purchase.
            </Description>
            <p>
              <p className="mb-4">
                These terms and conditions outline the rules and regulations for
                the use of Intellizence&apos;s Website.
              </p>
              <div className="mx-5 mb-4">
                <ol type="1">
                  <li>
                    Non-Commercial Use: The data purchased is strictly for
                    personal or internal business use and must not be used for
                    monetary gain or resale purposes.
                  </li>
                  <li>
                    Source and Compliance: All data provided originates from
                    publicly available sources and complies with relevant data
                    privacy laws and regulations. We do not support the sale or
                    purchase of confidential or personally identifiable
                    information.
                  </li>
                  <li>
                    Legal Compliance: You agree to use the data in accordance
                    with applicable data protection and privacy laws. It is your
                    responsibility to ensure that your use of the data does not
                    infringe upon any laws or regulations.
                  </li>
                  <li>
                    Prohibited Actions: Reselling or commercializing the
                    purchased data is strictly prohibited. Violations may result
                    in penalties, legal action, and termination of platform
                    access.
                  </li>
                </ol>
              </div>
              <p className="mb-4">
                By accepting these terms, you acknowledge and agree to adhere to
                these conditions. Failure to comply may result in penalties,
                legal action, and termination of access to our platform.
              </p>
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-600 px-4 py-2 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="bg-blue-600 px-4 py-2 rounded text-white"
              >
                Accept
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default BuyNowButton;
