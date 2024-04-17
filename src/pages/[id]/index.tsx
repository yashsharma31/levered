import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { GetServerSideProps } from "next";

import { DateStoreType } from "@components/types/dataStore";
import SampleImage from "../../assets/images/data-sample.png";
import { fetchDataStore } from "@components/services/dataStore";
import { Header } from "@components/components/DataStore/Header";
import { Footer } from "@components/components/DataStore/Footer";
import ShoppingCartIcon from "../../assets/images/shopping-cart.png";
import { SUBSCRIPTIONS } from "@components/utils/constants";
import { formatDate, objectToFormattedString } from "@components/utils/helper";
import { fetchDatasetPreview } from "@components/services/datasetsSample";
import DatasetSample from "@components/components/DatasetSample";
import { Dataset } from "@components/types/datasetSample";
import { fetchDatasetDownloadUrl } from "@components/services/downloaSample";
import { useRouter } from "next/router";

interface DataPageProps {
  id: string | null;
  data: DateStoreType | null;
  error: string | null;
  datasetSample: Dataset | null;
  sampleFetchingError: string | null;
}

const Sample = ({
  id,
  data,
  error,
  datasetSample,
  sampleFetchingError,
}: DataPageProps) => {
  const router = useRouter();
  const DataSample = [
    {
      type: "Overview",
      heading: "Dataset Overview",
      content: [data?.subtitle, data?.full_description],
    },
    {
      type: "Data Preview",
      heading: "Data Preview",
      content: [],
    },
    {
      type: "List of Data Attributes",
      heading: "List of Data Attributes",
      content: [objectToFormattedString(data?.data_attributes as object)],
    },
  ];
  const [selectedType, setSelectedType] = useState(DataSample[0]);
  const [selectedSub, setSelectedSub] = useState(SUBSCRIPTIONS[0]);
  const updated_at = formatDate(data?.dataset_updated_at as Date);

  const handleBuyNowClick = () => {
    router.push(`/${id}/purchase`);
  };

  const handleDownloadSample = async () => {
    if (id) {
      const downloadUrl = await fetchDatasetDownloadUrl(id);

      if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      } else {
        console.error("Failed to retrieve download URL.");
      }
    }
  };

  return (
    <div>
      <div className="bg-[#4F87F5]">
        <Header />
      </div>
      <div className="mt-16 md:px-16 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between w-full py-8 items-center">
          <h2 className="text-5xl md:text-6xl md:font-semibold">Data Sample</h2>
          {/* <div className="flex px-2 md:px-6 py-2 border-2 md:border rounded-xl border-blue-400 items-center">
            <Image
              src={ShoppingCartIcon}
              alt="shopping-car-icon"
              width={40}
              height={40}
            />
            <button className="md:block hidden">Go to Shopping Cart(0)</button>
          </div> */}
        </div>
        <div className="flex gap-16 my-2 md:my-8 items-center">
          <div className="md:max-w-lg w-full flex flex-col md:gap-2 gap-8">
            <p>Last Updated: {updated_at}</p>
            <div className="flex items-center gap-8">
              <p className="text-4xl md:text-5xl md:font-semibold">
                {data?.title}
              </p>
              <p className="border py-1 px-4 rounded-full font-semibold text-2xl">
                ${data?.price}
              </p>
            </div>
            <div className="flex md:hidden">
              <Image
                src={SampleImage}
                alt="Sample-Image"
                width={800}
                height={200}
              />
            </div>
            <p className="py-4">{data?.short_description}</p>
            <button
              onClick={handleDownloadSample}
              className="px-12 py-4 bg-blue-500 md:max-w-max rounded-full text-lg text-white"
            >
              Download Data Sample
            </button>
          </div>
          <div className="hidden md:flex">
            <Image
              src={SampleImage}
              alt="Sample-Image"
              width={800}
              height={200}
            />
          </div>
        </div>
        <div className="mt-20 flex flex-col md:flex-row gap-2">
          <div className="w-full">
            <div className="flex justify-around px-4 max-w-3xl">
              {DataSample.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={clsx(
                      "md:py-3 bg-white px-2 text-center md:max-w-max max-w-[120px] py-2 md:px-12 cursor-pointer border-t border-x rounder-t rounded-t-xl",
                      selectedType.type === item.type ? "-mb-0.5" : ""
                    )}
                    onClick={() => setSelectedType(item)}
                  >
                    {item.type}
                  </p>
                );
              })}
            </div>
            <div className="w-full rounded-xl p-6 md:p-12 bg-white border">
              <p className="text-3xl">{selectedType.heading}</p>
              <br />
              <div className="max-w-[620px] mx-auto">
                {selectedType.type === "Data Preview" && (
                  <DatasetSample dataset={datasetSample} />
                )}
                {selectedType.type === "List of Data Attributes" &&
                  selectedType.content.map((item, index) => {
                    return (
                      <div key={index}>
                        <pre>{item}</pre>
                        <br />
                      </div>
                    );
                  })}
                {selectedType.type === "Overview" &&
                  selectedType.content.map((item, index) => {
                    return (
                      <div key={index}>
                        <p>{item}</p>
                        <br />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="max-w-[400px] pl-6 w-full">
            <div className="border max-h-max bg-white text-center mt-12 md:mt-0 rounded-xl p-6">
              <p className="text-3xl py-6 md:py-8">How to acquire it</p>
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
                        <div className="rounded-full border mt-1.5 h-5 w-5 border-blue-500 flex justify-center items-center">
                          <div className="h-3 w-3 p-1 border-spacing-4 border-blue-500 rounded-full bg-blue-500 border"></div>
                        </div>
                        <p className="col-span-3 text-left">{item.type}</p>
                        <p className="text-right col-span-2">
                          ${data?.price.toPrecision(2)}
                        </p>

                        <p className="col-span-6 text-base pt-4">
                          {item.description + data?.price.toPrecision(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-4 pt-16 pb-4">
                <button
                  onClick={handleBuyNowClick}
                  className="px-12 py-4 bg-blue-500 w-full rounded-full text-lg text-white"
                >
                  Buy Now
                </button>
                {/* <button className="px-12 py-4 white border-blue-500 border w-full rounded-full text-lg">
                Add to Cart
              </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<DataPageProps> = async (
  context
) => {
  const { query } = context;
  const id = query.id as string;
  const { data, error } = await fetchDataStore(id as string);
  const { data: datasetSample, error: sampleFetchingError } =
    await fetchDatasetPreview(id as string);

  return {
    props: {
      id: id || null,
      data: data || null,
      error: error || null,
      datasetSample: datasetSample || null,
      sampleFetchingError: sampleFetchingError || null,
    },
  };
};

export default Sample;
