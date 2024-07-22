import Image from "next/image";

import Logo from "../../../assets/images/intellizence_logo.jpg";
import Link from "next/link";
import NavBar from "@components/components/NavBar";
import { useRouter } from "next/router";
import { Fragment } from "react";

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
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex justify-between items-center p-8 text-white">
        <Image
          onClick={() => router.push("/")}
          src={Logo}
          alt="logo"
          width={200}
          height={100}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-16">
          {isLoggedIn ? (
            <NavBar userData={userData} />
          ) : (
            <div className="flex gap-4 max-w-max">
              <Link
                href={"/login"}
                className="bg-white px-8 py-2 rounded-full text-blue-600 text-lg"
              >
                Login
              </Link>
              <Link
                href={"/login"}
                className="border-2 border-white px-8 py-2 rounded-full text-lg text-white"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
