import Image from "next/image";

import LayoffImage from "../../../assets/images/layoffs.jpg";
import MergerAcquisitionImage from "../../../assets/images/merger-acquisitions.jpg";
import { formatDate } from "@components/utils/helper";
import RightArrowIcon from "@components/assets/icons/rightArrowIcon";
import { Dataset } from "@components/types/dataset";
import { useRouter } from "next/router";
import { fetchBoughtDatasetURL } from "@components/services/downloadBoughtDataset";
import { Tooltip } from "@mantine/core";
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
    <div className="max-w-[370px] border  rounded-2xl py-6 px-4">
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
      <div className="flex flex-col gap-4 px-4 mt-2">
        <div>
          <div className="flex items-center justify-between w-full">
            <Tooltip label={cardData.title}>
              <p className="text-2xl h-20 pr-2 py-2 font-semibold line-clamp-2">
                {cardData.title}
              </p>
            </Tooltip>
            <p className="border py-1 px-4 rounded-full">
              ${cardData.price.toFixed(2)}
            </p>
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
            <BuyNowButton
              isLoggedIn={isLoggedIn}
              handleBuyNowClick={handleBuyNowClick}
            />
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
