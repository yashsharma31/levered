import Image from "next/image";
import ShoppingCartIcon from "../../../assets/images/shopping-cart.png";
import clsx from "clsx";

export const Options = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-40 px-8 md:px-16 flex items-center justify-between">
        <h2 className="text-5xl font-semibold">Data Store</h2>
        <div className="flex px-2 py-2 md:py-1 border-2 md:border md:px-6 rounded-2xl  md:rounded-xl border-blue-400 items-center">
          <Image
            src={ShoppingCartIcon}
            alt="shopping-car-icon"
            width={40}
            height={40}
          />
          <button className="md:block hidden">Go to Shopping Cart(0)</button>
        </div>
      </div>
      <div className="md:px-16 px-8 mt-16 flex gap-2 md:gap-16 md:flex-row flex-col-reverse items-center">
        <div className="flex items-center justify-between md:justify-normal w-full gap-4">
          <p>Sort By:</p>
          <p className="px-4 py-2 border rounded-3xl">Order A to Z {"<"}</p>
        </div>
        <div className="flex gap-4 bg-slate-200 rounded-full border px-4 py-2 w-full max-w-2xl items-center">
          {"<"}
          <p>Hinted search text</p>
        </div>
      </div>
    </div>
  );
};
