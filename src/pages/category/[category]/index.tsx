import { GetServerSideProps, NextPage } from "next";
import { Inter } from "next/font/google";

import { Header } from "@components/components/DataStore/Header";
import { Footer } from "@components/components/DataStore/Footer";
import { Options } from "@components/components/DataStore/Options";
import { fetchDatasets } from "@components/services/datasets";
import { Dataset } from "@components/types/dataset";
import { Card } from "@components/components/DataStore/Card";
import { getCookie } from "@components/utils/tokenHelper";
import { ACCESS_TOKEN } from "@components/utils/constants";
import { fetchBoughtDatasets } from "@components/services/boughtDatasets";
import { fetchUserData } from "@components/services/userData";

const inter = Inter({ subsets: ["latin"] });

interface CategoryPageProps {
  jwtToken?: string;
  isLoggedIn: boolean;
  boughtDataset?: number[];
  categoryData: Dataset[];
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
  error: string | null | undefined;
}

const Category: NextPage<CategoryPageProps> = ({
  categoryData,
  isLoggedIn,
  error,
  jwtToken,
  userData,
  boughtDataset,
}) => {
  return (
    <div className="relative font-inter">
      <div className="bg-[#4F87F5]">
        <Header userData={userData} isLoggedIn={isLoggedIn} />
      </div>
      <Options />
      <div>
        <div className="mx-auto mt-8 px-8 md:px-16 max-w-7xl">
          <div className="flex flex-wrap gap-4 md:gap-4">
            {categoryData.length > 0 &&
              categoryData.map((category) => (
                <Card
                  isLoggedIn={isLoggedIn}
                  key={category.id}
                  cardData={category}
                  jwtToken={jwtToken}
                  boughtDataset={boughtDataset}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
      {error && (
        <div className="top-0 right-0 left-0 absolute bg-red-500 text-center text-white">
          Error loading data: {error}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async (
  context
) => {
  const authToken = getCookie(ACCESS_TOKEN, context.req.headers.cookie);
  const categoryId = context.params?.category;

  const isLoggedIn = !!authToken;

  if (!categoryId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const fetchUserPromise = authToken
    ? fetchUserData(authToken)
    : Promise.resolve({ data: null, error: null });
  let userData = null;

  const { data: categoryData, error } = await fetchDatasets(Number(categoryId));
  if (authToken) {
    const { ids: boughtDataset, error: boughtDatasetError } =
      await fetchBoughtDatasets(authToken);

    userData = (await fetchUserPromise).data;
    return {
      props: {
        jwtToken: authToken,
        boughtDataset,
        userData,
        isLoggedIn,
        categoryData,
        error: null,
      },
    };
  }

  if (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      categoryData,
      isLoggedIn,
      error: null,
    },
  };
};

export default Category;
