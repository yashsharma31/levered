import Image from "next/image";
import Logo from "@components/assets/images/intellizence_logo.jpg";
import { useRouter } from "next/router";

const TermsAndConditions = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="max-w-5xl mx-auto max-h-[90vh] p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 mt-10">Terms and Conditions</h1>
        <p className="mb-4">
          These terms and conditions outline the rules and regulations for the
          use of Intellizence&apos;s Website.
        </p>
        <p className="mb-4">
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use Intellizence if you do not agree to
          take all of the terms and conditions stated on this page.By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use Intellizence if you do not agree to take all of the
          terms and conditions stated on this page.By accessing this website we
          assume you accept these terms and conditions. Do not continue to use
          Intellizence if you do not agree to take all of the terms and
          conditions stated on this page.By accessing this website we assume you
          accept these terms and conditions. Do not continue to use Intellizence
          if you do not agree to take all of the terms and conditions stated on
          this page.By accessing this website we assume you accept these terms
          and conditions. Do not continue to use Intellizence if you do not
          agree to take all of the terms and conditions stated on this page.By
          accessing this website we assume you accept these terms and
          conditions. Do not continue to use Intellizence if you do not agree to
          take all of the terms and conditions stated on this page.By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use Intellizence if you do not agree to take all of the
          terms and conditions stated on this page.By accessing this website we
          assume you accept these terms and conditions. Do not continue to use
          Intellizence if you do not agree to take all of the terms and
          conditions stated on this page.By accessing this website we assume you
          accept these terms and conditions. Do not continue to use Intellizence
          if you do not agree to take all of the terms and conditions stated on
          this page.By accessing this website we assume you accept these terms
          and conditions. Do not continue to use Intellizence if you do not
          agree to take all of the terms and conditions stated on this page.By
          accessing this website we assume you accept these terms and
          conditions. Do not continue to use Intellizence if you do not agree to
          take all of the terms and conditions stated on this page.By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use Intellizence if you do not agree to take all of the
          terms and conditions stated on this page.By accessing this website we
          assume you accept these terms and conditions. Do not continue to use
          Intellizence if you do not agree to take all of the terms and
          conditions stated on this page.By accessing this website we assume you
          accept these terms and conditions. Do not continue to use Intellizence
          if you do not agree to take all of the terms and conditions stated on
          this page.By accessing this website we assume you accept these terms
          and conditions. Do not continue to use Intellizence if you do not
          agree to take all of the terms and conditions stated on this page.By
          accessing this website we assume you accept these terms and
          conditions. Do not continue to use Intellizence if you do not agree to
          take all of the terms and conditions stated on this page.By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use Intellizence if you do not agree to take all of the
          terms and conditions stated on this page.By accessing this website we
          assume you accept these terms and conditions. Do not continue to use
          Intellizence if you do not agree to take all of the terms and
          conditions stated on this page.By accessing this website we assume you
          accept these terms and conditions. Do not continue to use Intellizence
          if you do not agree to take all of the terms and conditions stated on
          this page.By accessing this website we assume you accept these terms
          and conditions. Do not continue to use Intellizence if you do not
          agree to take all of the terms and conditions stated on this page.By
          accessing this website we assume you accept these terms and
          conditions. Do not continue to use Intellizence if you do not agree to
          take all of the terms and conditions stated on this page.By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use Intellizence if you do not agree to take all of the
          terms and conditions stated on this page.By accessing this website we
          assume you accept these terms and conditions. Do not continue to use
          Intellizence if you do not agree to take all of the terms and
          conditions stated on this page.By accessing this website we assume you
          accept these terms and conditions. Do not continue to use Intellizence
          if you do not agree to take all of the terms and conditions stated on
          this page.By accessing this website we assume you accept these terms
          and conditions. Do not continue to use Intellizence if you do not
          agree to take all of the terms and conditions stated on this page.By
          accessing this website we assume you accept these terms and
          conditions. Do not continue to use Intellizence if you do not agree to
          take all of the terms and conditions stated on this page.By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use Intellizence if you do not agree to take all of the
          terms and conditions stated on this page.By accessing this website we
          assume you accept these terms and conditions. Do not continue to use
          Intellizence if you do not agree to take all of the terms and
          conditions stated on this page.By accessing this website we assume you
          accept these terms and conditions. Do not continue to use Intellizence
          if you do not agree to take all of the terms and conditions stated on
          this page.By accessing this website we assume you accept these terms
          and conditions. Do not continue to use Intellizence if you do not
          agree to take all of the terms and conditions stated on this page.By
          accessing this website we assume you accept these terms and
          conditions. Do not continue to use Intellizence if you do not agree to
          take all of the terms and conditions stated on this page.By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use Intellizence if you do not agree to take all of the
          terms and conditions stated on this page.By accessing this website we
          assume you accept these terms and conditions. Do not continue to use
          Intellizence if you do not agree to take all of the terms and
          conditions stated on this page.
        </p>
        <p className="mb-4">
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements:
          &ldquo;Client&rdquo;, &ldquo;You&rdquo; and &ldquo;Your&rdquo; refers
          to you, the person log on this website and compliant to the
          Company&apos;s terms and conditions. &ldquo;The Company&rdquo;,
          &ldquo;Ourselves&rdquo;, &ldquo;We&rdquo;, &ldquo;Our&rdquo; and
          &ldquo;Us&rdquo;, refers to our Company. &ldquo;Party&rdquo;,
          &ldquo;Parties&rdquo;, or &ldquo;Us&rdquo;, refers to both the Client
          and ourselves.
        </p>
        {/* Add more dummy content as needed */}
      </div>
      <div className="max-w-5xl py-4 w-full mx-auto px-8 flex justify-between">
        <Image src={Logo} alt="logo" width={200} height={100} />
        <button
          onClick={handleBackClick}
          className="bg-blue-400 max-w-max px-10 rounded text-white py-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
