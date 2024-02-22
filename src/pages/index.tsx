import { Inter } from "next/font/google";

import { Header } from "@components/components/DataStore/Header";
import { Options } from "@components/components/DataStore/Options";
import { CrouselWrapper } from "@components/components/DataStore/Crousel/CrouselWrapper";
import { Footer } from "@components/components/DataStore/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Options />
      <CrouselWrapper />
      <CrouselWrapper />
      <CrouselWrapper />
      <Footer />
    </div>
  );
}
