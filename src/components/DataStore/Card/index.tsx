import Image from "next/image";

import CardPlaceholder from "../../../assets/images/card-image.png";
import { formatDate } from "@components/utils/helper";
import RightArrowIcon from "@components/assets/icons/rightArrowIcon";
import { Dataset } from "@components/types/dataset";
import { useRouter } from "next/router";

export const Card = ({ cardData }: { cardData: Dataset }) => {
  // console.log(cardData, "cardData");
  const router = useRouter();
  const updateAt = formatDate(cardData.updated_at);
  console.log(router);

  const handleBuyNowClick = () => {
    router.push(`/${cardData.id}/purchase`);
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
          <button
            onClick={handleBuyNowClick}
            className="px-8 py-4 bg-blue-500 hover:shadow-md rounded-full text-lg text-white"
          >
            Buy Now
          </button>
          <div
            onClick={() => router.push(String(cardData.id))}
            className="px-4 text-[#9C9AA5] cursor-pointer flex justify-center text-lg"
          >
            <p>See More</p>
            <RightArrowIcon width={24} stroke="#9C9AA5" />
          </div>
        </div>
      </div>
    </div>
  );
};
