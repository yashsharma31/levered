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
        className="px-8 py-4 w-full bg-blue-500 hover:shadow-md rounded-full text-lg text-white"
      >
        Buy Now
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center bg-black bg-opacity-35 justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">
              Terms and Conditions
            </DialogTitle>
            <Description>
              Please accept our Terms and Conditions to proceed with your
              purchase.
            </Description>
            <p>[Short summary or key points of terms and conditions...]</p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="bg-blue-600 text-white py-2 px-4 rounded"
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
