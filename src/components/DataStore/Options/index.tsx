import Image from "next/image";
import ShoppingCartIcon from "../../../assets/images/shopping-cart.png";
import SearchIcon from "../../../assets/icons/searchIcon";
import DownIcon from "@components/assets/icons/downIcon";

export const Options = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-16 pb-10 px-8 md:px-16 flex items-center justify-between">
        <h2 className="text-5xl font-semibold">Premium Datasets</h2>
        {/* <div className="flex px-2 py-2 md:py-2 border-2 md:border md:px-6 rounded-2xl md:rounded-xl border-blue-400 items-center">
          <Image
            src={ShoppingCartIcon}
            alt="shopping-car-icon"
            width={40}
            height={40}
          />
          <button className="md:block hidden">Go to Shopping Cart(0)</button>
        </div> */}
      </div>
      {/* <div className="md:px-16 px-8 mt-16 flex gap-2 md:gap-16 md:flex-row flex-col-reverse items-center">
        <div className="flex items-center justify-between md:justify-normal w-full gap-4">
          <p>Sort By:</p>
          <div className="px-4 py-2 gap-2 border flex rounded-3xl">
            <p>Order A to Z</p>
            <DownIcon />
          </div>
        </div>
        <div className="flex gap-2 bg-slate-200 text-gray-500 rounded-full border px-2 w-full max-w-2xl items-center">
          <SearchIcon />
          <p>Hinted search text</p>
        </div>
      </div> */}
    </div>
  );
};
