import Image from "next/image";

import Logo from "../../../assets/images/intellizence_logo.jpg";
import Link from "next/link";
import NavBar from "@components/components/NavBar";

export const Header = ({
  isLoggedIn,
  userData,
}: {
  isLoggedIn?: boolean;
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
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex p-8 text-white items-center justify-between">
        <Image src={Logo} alt="logo" width={200} height={100} />
        <div className="flex items-center gap-16">
          {isLoggedIn ? (
            <NavBar userData={userData} />
          ) : (
            <Link
              href={"/login"}
              className="px-8 py-2 bg-white text-blue-600 text-lg rounded-full"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
