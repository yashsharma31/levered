import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

import { Header } from "@components/components/DataStore/Header";
import ShoppingCartIcon from "../../assets/images/shopping-cart.png";
import SampleImage from "../../assets/images/data-sample.png";
import { DATA_SAMPLE, SUBSCRIPTIONS } from "@components/utils/constants";
import { Footer } from "@components/components/DataStore/Footer";

const Sample = () => {
  const [selectedType, setSelectedType] = useState(DATA_SAMPLE[0]);
  const [selectedSub, setSelectedSub] = useState(SUBSCRIPTIONS[0]);

  const handleTabClick = (data) => {
    setSelectedType(data);
  };

  return (
    <div>
      <Header />
      <div className="mt-16 px-16 max-w-7xl mx-auto">
        <div className="flex justify-between py-8 items-center">
          <h2 className="text-6xl font-semibold">Data Sample</h2>
          <div className="flex px-6 py-2 border rounded-xl border-blue-400 items-center">
            <Image
              src={ShoppingCartIcon}
              alt="shopping-car-icon"
              width={40}
              height={40}
            />
            <button>Go to Shopping Cart(0)</button>
          </div>
        </div>
        <div className="flex gap-16 my-8 items-center">
          <div className="max-w-lg flex flex-col gap-2">
            <p>Last Updated: February 15, 2024</p>
            <div className="flex items-center  gap-8">
              <p className="text-4xl font-semibold">
                Electronics Product Sales Dataset
              </p>
              <p className="border py-1 px-4 rounded-full font-semibold text-2xl">
                $99,99
              </p>
            </div>
            <p className="py-4">
              This dataset contains information about sales of electronics
              products over the past year, including details such as product
              type, quantity sold, unit price, and location of sale.
            </p>
            <button className="px-12 py-4 bg-blue-500 max-w-max rounded-full text-lg text-white">
              Download Data Sample
            </button>
          </div>
          <div>
            <Image
              src={SampleImage}
              alt="Sample-Image"
              width={800}
              height={200}
            />
          </div>
        </div>
        <div className="mt-20 flex gap-8">
          <div>
            <div className="flex justify-around px-4 max-w-3xl">
              {DATA_SAMPLE.map((item) => {
                return (
                  <p
                    className={clsx(
                      "py-3 bg-white  px-12 cursor-pointer border-t border-x rounder-t rounded-t-xl",
                      selectedType.type === item.type ? "-mb-0.5" : ""
                    )}
                    onClick={() => handleTabClick(item)}
                  >
                    {item.type}
                  </p>
                );
              })}
            </div>
            <div className="max-w-3xl rounded-xl p-16 bg-white border">
              <p className="text-3xl">{selectedType.heading}</p>
              <br />
              <p>
                {selectedType.content.map((item) => {
                  return (
                    <div>
                      <p>{item}</p>
                      <br />
                    </div>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="border bg-white text-center rounded-xl max-w-[400px] p-6">
            <p className="text-3xl py-8">How to acquire it</p>
            <div className="flex flex-col gap-8">
              {SUBSCRIPTIONS.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className={clsx(
                        "grid grid-cols-6 cursor-pointer rounded-2xl border-blue-500 text-xl p-8",
                        selectedSub.type === item.type
                          ? "border-2 shadow-lg"
                          : "border shadow-md"
                      )}
                      onClick={() => setSelectedSub(item)}
                    >
                      <div className="h-6 w-6 rounded-full border"></div>
                      <p className="col-span-3 text-left">{item.type}</p>
                      <p className="text-right col-span-2">{item.cost}</p>

                      <p className="col-span-6 text-base pt-4">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-4 py-16">
              <button className="px-12 py-4 bg-blue-500 w-full rounded-full text-lg text-white">
                Buy Now
              </button>
              <button className="px-12 py-4 white border-blue-500 border w-full rounded-full text-lg">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sample;
