import Image from "next/image";

import CardPlaceholder from "../../../assets/images/card-image.png";
import { formatDate } from "@components/utils/helper";
import RightArrowIcon from "@components/assets/icons/rightArrowIcon";
import { Dataset } from "@components/types/dataset";
import { useRouter } from "next/router";
import { fetchBoughtDatasetURL } from "@components/services/downloadBoughtDataset";

export const Card = ({
  cardData,
  jwtToken,
  boughtDataset,
}: {
  cardData: Dataset;
  jwtToken?: string;
  boughtDataset?: number[];
}) => {
  const router = useRouter();
  const updateAt = formatDate(cardData.updated_at);

  console.log("router", router);

  const isAlreadyBought = boughtDataset?.includes(cardData.id);

  const handlePredownloadedDataset = async () => {
    if (jwtToken && cardData.id) {
      const downloadUrl = await fetchBoughtDatasetURL(
        jwtToken as string,
        cardData.id.toString()
      );
      if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      } else {
        console.error("Failed to retrieve download URL.");
      }
    }
  };

  const handleBuyNowClick = () => {
    // Attempt to navigate using an absolute path
    const newPath = `/${cardData.id}/purchase`;
    if (newPath !== router.pathname) {
      // Prevent redundant navigation
      router.push(newPath);
    } else {
      // Force a full URL if needed (not typically recommended for client-side routing)
      const fullUrl = `${window.location.protocol}//${window.location.host}/${cardData.id}/purchase`;
      window.location.href = fullUrl;
    }
  };

  const handleSeeMoreClick = () => {
    // Attempt to navigate using an absolute path
    const newPath = `/${cardData.id}`;
    if (newPath !== router.pathname) {
      // Prevent redundant navigation
      router.push(newPath);
    } else {
      // Force a full URL if needed (not typically recommended for client-side routing)
      const fullUrl = `${window.location.protocol}//${window.location.host}/${cardData.id}`;
      window.location.href = fullUrl;
    }
  };

  return (
    <div className="max-w-[370px] border  rounded-2xl py-6 px-4">
      <Image src={CardPlaceholder} alt="card-image" width={400} height={200} />
      <div className="flex flex-col gap-4 px-4 mt-8">
        <div>
          <div className="flex items-center justify-between w-full">
            <p className="text-2xl font-semibold line-clamp-2">
              {cardData.title}
            </p>
            <p className="border py-1 px-4 rounded-full">${cardData.price}</p>
          </div>
          <p className="text-gray-400">Last Updated: {updateAt}</p>
        </div>
        <p className="line-clamp-3">{cardData.short_description}</p>
        <div className="flex flex-col mt-8 gap-4">
          {isAlreadyBought ? (
            <button
              onClick={handlePredownloadedDataset}
              className="px-8 py-4 bg-blue-500 hover:shadow-md rounded-full text-lg text-white"
            >
              Download
            </button>
          ) : (
            <button
              onClick={handleBuyNowClick}
              className="px-8 py-4 bg-blue-500 hover:shadow-md rounded-full text-lg text-white"
            >
              Buy Now
            </button>
          )}
          <div
            onClick={handleSeeMoreClick}
            className="px-4 text-gray-500 cursor-pointer flex justify-center text-lg"
          >
            <p>See More</p>
            <RightArrowIcon width={24} stroke="#9C9AA5" />
          </div>
        </div>
      </div>
    </div>
  );
};
