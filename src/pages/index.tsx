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
import { fetchUserData } from "@components/services/userData";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  isLoggedIn: boolean;
  boughtDataset?: number[];
  datasetsByCategory: { [key: string]: Dataset[] };
  userResponse?: {
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
  categoriesData: CategoriesType[];
  jwtToken?: string;
  error: string | null;
}

const Home: NextPage<HomeProps> = ({
  boughtDataset,
  isLoggedIn,
  datasetsByCategory,
  userResponse,
  categoriesData,
  jwtToken,
  error,
}) => {
  return (
    <div className="relative font-inter">
      <div className="bg-[#4F87F5]">
        <Header isLoggedIn={isLoggedIn} userData={userResponse} />
      </div>
      <Options />
      {categoriesData.map((category) => (
        <CrouselWrapper
          isLoggedIn={isLoggedIn}
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

  const isLoggedIn = !!authToken;

  const fetchCategoriesPromise = fetchCategories();
  const fetchUserPromise = authToken
    ? fetchUserData(authToken)
    : Promise.resolve({ data: null, error: null });

  const [categoriesResponse, userResponse] = await Promise.all([
    fetchCategoriesPromise,
    fetchUserPromise,
  ]);
  console.log(userResponse);
  console.log(userResponse, "userResponse");
  const { data: categoriesData, error: categoriesError } = categoriesResponse;

  if (categoriesError) {
    return {
      props: {
        isLoggedIn,
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
        isLoggedIn,
        jwtToken: authToken,
        boughtDataset,
        userResponse: userResponse.data,
        datasetsByCategory,
        categoriesData,
        error,
      },
    };
  }

  return {
    props: {
      isLoggedIn,
      datasetsByCategory,
      categoriesData,
      error,
    },
  };
};

export default Home;
