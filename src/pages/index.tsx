import { GetServerSideProps, NextPage } from "next";
import { Inter } from "next/font/google";

import { fetchVendors } from "@components/services/vendor";
import { VendorsResponseType } from "@components/types/vendors";
import { Header } from "@components/components/DataStore/Header";
import { Footer } from "@components/components/DataStore/Footer";
import { Options } from "@components/components/DataStore/Options";
import { CrouselWrapper } from "@components/components/DataStore/Crousel/CrouselWrapper";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps extends VendorsResponseType {}

const Home: NextPage<HomeProps> = ({ data, error }) => {
  console.log("data", data);
  return (
    <div className="relative font-inter">
      <Header />
      <Options />
      <CrouselWrapper />
      <CrouselWrapper />
      <CrouselWrapper />
      <Footer />
      {error && (
        <div className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center">
          Error loading vendors: {error}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data, error } = await fetchVendors();

  return {
    props: {
      data: data || [],
      error: error || null,
    },
  };
};

export default Home;
