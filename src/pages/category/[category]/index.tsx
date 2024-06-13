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

const inter = Inter({ subsets: ["latin"] });

interface CategoryPageProps {
  jwtToken?: string;
  isLoggedIn: boolean;
  boughtDataset?: number[];
  categoryData: Dataset[];
  error: string | null | undefined;
}

const Category: NextPage<CategoryPageProps> = ({
  categoryData,
  isLoggedIn,
  error,
  jwtToken,
  boughtDataset,
}) => {
  return (
    <div className="relative font-inter">
      <div className="bg-[#4F87F5]">
        <Header />
      </div>
      <Options />
      <div>
        <div className="max-w-7xl mx-auto px-8 md:px-16 mt-8">
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
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center">
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

  const { data: categoryData, error } = await fetchDatasets(Number(categoryId));
  if (authToken) {
    const { ids: boughtDataset, error: boughtDatasetError } =
      await fetchBoughtDatasets(authToken);
    return {
      props: {
        jwtToken: authToken,
        boughtDataset,
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
