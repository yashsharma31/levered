import Image from "next/image";

import backgroundImage from "../../../assets/images/background.png";
import Logo from "@components/assets/icons/logo";

export const Header = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex p-8 text-white items-center justify-between">
        <Logo />
        <div className="flex items-center gap-16">
          <p>Home</p>
          <p>Free Guide</p>
          <p>Data Store</p>
          <p>Blog</p>
        </div>
      </div>
      <div className="text-center text-white drop-shadow-lg py-12 text-6xl leading-[80px]">
        Build a dataset once.
        <br />
        Monetize it endlessly!
      </div>
      <div className="absolute -z-10 top-0 left-0">
        <Image
          src={backgroundImage}
          alt={"landing-page-background"}
          width={1800}
          height={1400}
        />
      </div>
    </div>
  );
};
