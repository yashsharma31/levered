import Image from "next/image";
import Link from "next/link";
import Logo from "@components/assets/images/intellizence_logo.jpg";

export const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto">
        <div className="flex px-8 py-12 mt-8 items-center justify-between">
          <Image src={Logo} alt="logo" width={200} height={100} />
          <div className="flex items-center gap-8">
            <Link href="/terms-and-conditions">
              <p className="text-blue-600 hover:underline">
                Terms & Conditions
              </p>
            </Link>
            &copy; 2024 intellizence. Powered by Levered.
          </div>
        </div>
      </div>
    </footer>
  );
};
