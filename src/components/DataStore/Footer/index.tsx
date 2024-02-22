import LogoBlack from "@components/assets/icons/logoBlack";

export const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto">
        <div className="flex px-8 py-12 mt-8 items-center justify-between">
          <LogoBlack />
          <div className="flex items-center gap-16">
            <p>Home</p>
            <p>Free Guide</p>
            <p>Data Store</p>
            <p>Blog</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
