import { GetServerSideProps, NextPage } from "next";
import { Inter } from "next/font/google";

import { Header } from "@components/components/DataStore/Header";
import { Footer } from "@components/components/DataStore/Footer";
import { Options } from "@components/components/DataStore/Options";
import { CrouselWrapper } from "@components/components/DataStore/Crousel/CrouselWrapper";
import { fetchCategories } from "@components/services/categories";
import { CategoriesType } from "@components/types/categories";
import { fetchDatasets } from "@components/services/datasets";
import { Dataset } from "@components/types/dataset";
import { fetchBoughtDatasets } from "@components/services/boughtDatasets";
import { getCookie } from "@components/utils/tokenHelper";
import { ACCESS_TOKEN } from "@components/utils/constants";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  boughtDataset?: number[];
  datasetsByCategory: { [key: string]: Dataset[] };
  categoriesData: CategoriesType[];
  jwtToken?: string;
  error: string | null;
}

const Home: NextPage<HomeProps> = ({
  boughtDataset,
  datasetsByCategory,
  categoriesData,
  jwtToken,
  error,
}) => {
  return (
    <div className="relative font-inter">
      <div className="bg-[#4F87F5]">
        <Header />
      </div>
      <Options />
      {categoriesData.map((category) => (
        <CrouselWrapper
          jwtToken={jwtToken}
          boughtDataset={boughtDataset}
          key={category.id}
          categoryId={category.id}
          heading={category.name}
          data={datasetsByCategory[category.id] || []}
        />
      ))}
      <Footer />
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center">
          Error loading data: {error}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const authToken = getCookie(ACCESS_TOKEN, context.req.headers.cookie);
  let error = null;
  const datasetsByCategory: { [key: string]: Dataset[] } = {};

  const { data: categoriesData, error: categoriesError } =
    await fetchCategories();

  if (categoriesError) {
    return {
      props: {
        datasetsByCategory: {},
        categoriesData: [],
        error: categoriesError,
      },
    };
  }

  for (const category of categoriesData) {
    const { data: dataset, error: datasetError } = await fetchDatasets(
      category.id
    );

    if (datasetError) {
      datasetsByCategory[category.id] = [];
      error = "One or more categories failed to load datasets.";
    } else {
      datasetsByCategory[category.id] = dataset;
    }
  }
  if (authToken) {
    const { ids: boughtDataset, error: boughtDatasetError } =
      await fetchBoughtDatasets(authToken);
    return {
      props: {
        jwtToken: authToken,
        boughtDataset,
        datasetsByCategory,
        categoriesData,
        error,
      },
    };
  }

  return {
    props: {
      datasetsByCategory,
      categoriesData,
      error,
    },
  };
};

export default Home;
