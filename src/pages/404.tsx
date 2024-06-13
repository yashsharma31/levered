import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow bg-gray-100">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
          <h2 className="mt-4 text-4xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            The page you are looking for does not exist.
          </p>
          <Link href="/">
            <p className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Go back to Home
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Custom404;
