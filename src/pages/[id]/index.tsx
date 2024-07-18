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
import { ACCESS_TOKEN, SUBSCRIPTIONS } from "@components/utils/constants";
import { formatDate, objectToFormattedString } from "@components/utils/helper";
import { fetchDatasetPreview } from "@components/services/datasetsSample";
import DatasetSample from "@components/components/DatasetSample";
import { Dataset } from "@components/types/datasetSample";
import { fetchDatasetDownloadUrl } from "@components/services/downloaSample";
import { useRouter } from "next/router";
import { getCookie } from "@components/utils/tokenHelper";
import { fetchBoughtDatasets } from "@components/services/boughtDatasets";
import { fetchBoughtDatasetURL } from "@components/services/downloadBoughtDataset";
import BuyNowButton from "@components/components/DataStore/Card/BuyNowButton";
import { fetchUserData } from "@components/services/userData";

interface DataPageProps {
  isLoggedIn: boolean;
  id: string | null;
  jwtToken?: string;
  userData?: {
    email: string;
    name: string;
    is_active: boolean;
    company: string | null;
    address_house_num: string | null;
    address_street: string | null;
    address_city: string | null;
    address_state: string | null;
    address_country: string | null;
    address_zip: string | null;
  };
  isAlreadyBought?: boolean;
  data: DateStoreType | null;
  error: string | number | null;
  datasetSample: Dataset | null;
  sampleFetchingError: string | null;
}

const Sample = ({
  id,
  data,
  isLoggedIn,
  isAlreadyBought,
  error,
  userData,
  jwtToken,
  datasetSample,
  sampleFetchingError,
}: DataPageProps) => {
  const router = useRouter();
  const DataSample = [
    {
      type: "Overview",
      heading: "Dataset Overview",
      content: [data?.subtitle || "", data?.full_description || ""],
    },
    {
      type: "Data Preview",
      heading: "Data Preview",
      content: [],
    },
    {
      type: "List of Data Attributes",
      heading: "List of Data Attributes",
      content: data?.data_attributes as string[],
    },
  ];
  const [selectedType, setSelectedType] = useState(DataSample[0]);
  const [selectedSub, setSelectedSub] = useState(SUBSCRIPTIONS[0]);
  const updated_at = formatDate(data?.dataset_updated_at as Date);

  const handleBuyNowClick = () => {
    router.push(`/${id}/purchase`);
  };

  const handlePredownloadedDataset = async () => {
    if (jwtToken && id) {
      const downloadUrl = await fetchBoughtDatasetURL(
        jwtToken as string,
        id.toString()
      );
      if (downloadUrl) {
        window.open(downloadUrl, "_blank");
      } else {
        console.error("Failed to retrieve download URL.");
      }
    }
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
        <Header isLoggedIn={isLoggedIn} userData={userData} />
      </div>
      <div className="mx-auto mt-16 px-4 md:px-16 max-w-7xl">
        <div className="flex justify-between items-center py-8 w-full">
          <h2 className="md:font-semibold text-5xl md:text-6xl">Data Sample</h2>
          {/* <div className="flex items-center border-2 px-2 md:px-6 py-2 md:border border-blue-400 rounded-xl">
            <Image
              src={ShoppingCartIcon}
              alt="shopping-car-icon"
              width={40}
              height={40}
            />
            <button className="md:block hidden">Go to Shopping Cart(0)</button>
          </div> */}
        </div>
        <div className="flex items-center gap-16 my-2 md:my-8">
          <div className="flex flex-col gap-8 md:gap-2 w-full md:max-w-lg">
            <p>Last Updated: {updated_at}</p>
            <div className="flex items-center gap-8">
              <p className="md:font-semibold text-4xl md:text-5xl">
                {data?.title}
              </p>
              <p className="px-4 py-1 border rounded-full font-semibold text-2xl">
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
              className="bg-blue-500 px-12 py-4 rounded-full md:max-w-max text-lg text-white"
            >
              Download Data Sample
            </button>
          </div>
          <div className="md:flex hidden">
            <Image
              src={SampleImage}
              alt="Sample-Image"
              width={800}
              height={200}
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2 mt-20">
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
            <div className="bg-white p-6 md:p-12 border rounded-xl w-full">
              <p className="text-3xl">{selectedType.heading}</p>
              <br />
              <div className="mx-auto max-w-[620px]">
                {selectedType.type === "Data Preview" && (
                  <DatasetSample dataset={datasetSample} />
                )}
                {selectedType.type === "List of Data Attributes" &&
                  selectedType.content.map((item, index) => {
                    return (
                      <div key={index}>
                        <p>{item}</p>
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
          <div className="pl-6 w-full max-w-[400px]">
            <div className="bg-white mt-12 md:mt-0 p-6 border rounded-xl max-h-max text-center">
              <p className="py-6 md:py-8 text-3xl">How to acquire it</p>
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
                        <div className="flex justify-center items-center mt-1.5 border border-blue-500 rounded-full w-5 h-5">
                          <div className="border-spacing-4 bg-blue-500 p-1 border border-blue-500 rounded-full w-3 h-3"></div>
                        </div>
                        <p className="col-span-3 text-left">{item.type}</p>
                        <p className="text-right col-span-2">
                          ${data?.price.toFixed(2)}
                        </p>

                        <p className="col-span-6 pt-4 text-base">
                          {item.description + data?.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-4 pt-16 pb-4">
                {isAlreadyBought ? (
                  <button
                    onClick={handlePredownloadedDataset}
                    className="bg-blue-500 px-12 py-4 rounded-full w-full text-lg text-white"
                  >
                    Download
                  </button>
                ) : (
                  <BuyNowButton
                    isLoggedIn={isLoggedIn}
                    handleBuyNowClick={handleBuyNowClick}
                  />
                  // <button
                  //   onClick={handleBuyNowClick}
                  //   className="bg-blue-500 px-12 py-4 rounded-full w-full text-lg text-white"
                  // >
                  //   Buy Now
                  // </button>
                )}
                {/* <button className="px-12 py-4 border border-blue-500 rounded-full w-full text-lg white">
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
  const authToken = getCookie(ACCESS_TOKEN, context.req.headers.cookie);
  const isLoggedIn = !!authToken;
  const id = query.id as string;
  const { data, error } = await fetchDataStore(id as string);
  const { data: datasetSample, error: sampleFetchingError } =
    await fetchDatasetPreview(id as string);

  if (error === 422) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  const fetchUserPromise = authToken
    ? fetchUserData(authToken)
    : Promise.resolve({ data: null, error: null });
  let userData = null;

  if (authToken) {
    const { ids: boughtDataset, error: boughtDatasetError } =
      await fetchBoughtDatasets(authToken);
    userData = (await fetchUserPromise).data;
    const isAlreadyBought = boughtDataset.includes(Number(id));
    return {
      props: {
        isLoggedIn,
        jwtToken: authToken,
        isAlreadyBought,
        userData,
        id: id || null,
        data: data || null,
        error: error || null,
        datasetSample: datasetSample || null,
        sampleFetchingError: sampleFetchingError || null,
      },
    };
  }

  return {
    props: {
      isLoggedIn,
      id: id || null,
      data: data || null,
      error: error || null,
      datasetSample: datasetSample || null,
      sampleFetchingError: sampleFetchingError || null,
    },
  };
};

export default Sample;
