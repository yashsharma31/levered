import Image from "next/image";

import LayoffImage from "../../../assets/images/layoffs.jpg";
import MergerAcquisitionImage from "../../../assets/images/merger-acquisitions.jpg";
import { formatDate } from "@components/utils/helper";
import RightArrowIcon from "@components/assets/icons/rightArrowIcon";
import { Dataset } from "@components/types/dataset";
import { useRouter } from "next/router";
import { fetchBoughtDatasetURL } from "@components/services/downloadBoughtDataset";
// import { Tooltip } from "@mantine/core";
import BuyNowButton from "./BuyNowButton";

export const Card = ({
  isLoggedIn,
  cardData,
  jwtToken,
  boughtDataset,
}: {
  cardData: Dataset;
  isLoggedIn: boolean;
  jwtToken?: string;
  boughtDataset?: number[];
}) => {
  const router = useRouter();
  const updateAt = formatDate(cardData.updated_at);

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
    <div className="px-4 pb-6 border rounded-2xl max-w-[370px]">
      <div className="bg-white ml-auto rounded-sm max-w-max translate-y-8">
        <p className="z-10 px-4 py-1 font-semibold">
          ${cardData.price.toFixed(2)}
        </p>
      </div>
      <Image
        src={
          cardData.category.slug == "layoffs"
            ? LayoffImage
            : MergerAcquisitionImage
        }
        alt="card-image"
        className="rounded-md"
        width={400}
        height={200}
      />

      <div className="flex flex-col gap-4 mt-2 px-4">
        <div>
          <div className="flex flex-col justify-between mb-2 w-full">
            {/* <Tooltip label={cardData.title}> */}
            <p className="py-2 line-clamp-3 pr-2 h-20 font-semibold text-2xl">
              {cardData.title}
            </p>
            {/* </Tooltip> */}
          </div>
          <p className="text-gray-400">Last Updated: {updateAt}</p>
        </div>
        <p className="line-clamp-3">{cardData.short_description}</p>
        <div className="flex flex-col gap-4 mt-8">
          {isAlreadyBought ? (
            <button
              onClick={handlePredownloadedDataset}
              className="bg-blue-500 hover:shadow-md px-8 py-4 rounded-full text-lg text-white"
            >
              Download
            </button>
          ) : (
            <BuyNowButton
              isLoggedIn={isLoggedIn}
              handleBuyNowClick={handleBuyNowClick}
            />
          )}
          <div
            onClick={handleSeeMoreClick}
            className="flex justify-center px-4 text-gray-500 text-lg cursor-pointer"
          >
            <p>See More</p>
            <RightArrowIcon width={24} stroke="#9C9AA5" />
          </div>
        </div>
      </div>
    </div>
  );
};
