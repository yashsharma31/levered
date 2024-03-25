import { GetServerSideProps, NextPage } from "next";
import { Inter } from "next/font/google";

import { Header } from "@components/components/DataStore/Header";
import { Footer } from "@components/components/DataStore/Footer";
import { Options } from "@components/components/DataStore/Options";
import { fetchDatasets } from "@components/services/datasets";
import { Dataset } from "@components/types/dataset";
import { Card } from "@components/components/DataStore/Card";

const inter = Inter({ subsets: ["latin"] });

interface CategoryPageProps {
  categoryData: Dataset[];
  error: string | null | undefined;
}

const Category: NextPage<CategoryPageProps> = ({ categoryData, error }) => {
  return (
    <div className="relative font-inter">
      <Header />
      <Options />
      <div>
        <div className="max-w-7xl mx-auto px-8 md:px-16 mt-8">
          <div className="flex flex-wrap gap-4 md:gap-8">
            {categoryData.length > 0 &&
              categoryData.map((category) => (
                <Card key={category.id} cardData={category} />
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
  const categoryId = context.params?.category;

  if (!categoryId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: categoryData, error } = await fetchDatasets(Number(categoryId));

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
      error: null,
    },
  };
};

export default Category;
