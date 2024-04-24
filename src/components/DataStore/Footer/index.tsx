import LogoBlack from "@components/assets/icons/logoBlack";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto">
        <div className="flex px-8 py-12 mt-8 items-center justify-between">
          <LogoBlack />
          <div className="flex items-center gap-16">
            <Link href={"/"}>Home</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
