import Image from "next/image";
import ShoppingCartIcon from "../../../assets/images/shopping-cart.png";

export const Options = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-40 px-16 flex items-center justify-between">
        <h2 className="text-5xl font-semibold">Data Store</h2>
        <div className="flex px-6 py-1 border rounded-xl border-blue-400 items-center">
          <Image
            src={ShoppingCartIcon}
            alt="shopping-car-icon"
            width={40}
            height={40}
          />
          <button>Go to Shopping Cart(0)</button>
        </div>
      </div>
      <div className="px-16 mt-16 flex gap-16 items-center">
        <div className="flex items-center gap-4">
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
