import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ProfileIcon from "../../assets/images/profile.png";
import Image from "next/image";
import Link from "next/link";

const NavBar = ({
  userData,
}: {
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

  const handleLogout = () => {
    Cookies.remove("levered_jwt");
    router.reload();
  };

  return (
    <div className="relative">
      <Menu>
        <MenuButton className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <Image
            src={ProfileIcon}
            alt="Profile"
            width={80}
            height={80}
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
        <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 top-12 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              <p className="data-[focus]:bg-gray-100 block px-4 py-2 text-sm text-gray-700">
                {userData?.name}
              </p>
            </MenuItem>
            <MenuItem>
              <Link
                href="/settings?tab=my_account"
                className="data-[focus]:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
              >
                My Account
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/settings?tab=purchase-history"
                className="data-[focus]:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
              >
                Purchase History
              </Link>
            </MenuItem>
            <MenuItem>
              <p
                onClick={handleLogout}
                className="data-[focus]:bg-gray-100 block w-full text-left px-4 py-2 text-sm text-gray-700"
              >
                Logout
              </p>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default NavBar;
