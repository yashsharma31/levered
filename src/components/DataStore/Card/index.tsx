import Image from "next/image";

import CardPlaceholder from "../../../assets/images/card-image.png";

export const Card = () => {
  return (
    <div className="max-w-[370px] border  rounded-2xl py-6 px-4">
      <Image src={CardPlaceholder} alt="card-image" width={400} height={200} />
      <div className="flex flex-col gap-4 px-4 mt-8">
        <div>
          <div className="flex items-center justify-between w-full">
            <p className="text-2xl font-semibold">Industry</p>
            <p className="border py-1 px-4 rounded-full">$99,99</p>
          </div>
          <p className="text-gray-400">Last Updated: February 15, 2024</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipiscing elit.Lorem ipsum
          dolor sit amet consectetur adipiscing elit.Lorem ipsum dolor.
        </p>
        <div className="flex flex-col mt-8 gap-4">
          <button className="px-8 py-4 bg-blue-500 rounded-full text-lg text-white">
            Buy Now
          </button>
          <button className="px-4 text-lg">See More {">>"}</button>
        </div>
      </div>
    </div>
  );
};
