import { Fragment, useState } from "react";
import { Button, Tab, TabGroup, TabList } from "@headlessui/react";
import MyAccountTab from "@components/components/TabsComponent/MyAccount";
import PurchaseHistoryTab from "@components/components/TabsComponent/PurchaseHistory";
import { Header } from "@components/components/DataStore/Header";
import { GetServerSideProps } from "next";
import { ACCESS_TOKEN } from "@components/utils/constants";
import { getCookie } from "@components/utils/tokenHelper";
import { fetchUserData } from "@components/services/userData";
import { fetchBoughtDatasets } from "@components/services/boughtDatasets";
import { BoughtDatasetsResponseType } from "@components/types/dataset";
import { useRouter } from "next/router";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SettingPageProps {
  isLoggedIn: boolean;
  userResponse?: {
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
  purchasedDatasets: BoughtDatasetsResponseType | { data: null; error: null };
}

export default function SettingsPage({
  isLoggedIn,
  userResponse,
  purchasedDatasets,
}: SettingPageProps) {
  const router = useRouter();
  const { tab } = router.query;

  const getInitialTabIndex = () => {
    if (tab === "purchase-history") return 1;
    return 0; // default to My Account
  };

  const [selectedTab, setSelectedTab] = useState(getInitialTabIndex);

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <Fragment>
      <div>
        <Header isLoggedIn={isLoggedIn} userData={userResponse} />
      </div>
      <div className="flex max-w-7xl mx-auto mt-12">
        <div className="w-1/4 p-4">
          <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Button
              onClick={handleBackClick}
              className="w-full flex justify-center py-2.5 mb-8 text-sm outline-none rounded font-medium border hover:bg-slate-200"
            >
              <p className="px-2">Go Back</p>
            </Button>
            <TabList className="flex flex-col space-y-4">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm border-l-4 leading-5 outline-none font-medium text-left",
                    selected
                      ? "text-blue-700 border-blue-700"
                      : "text-gray-700 border-white"
                  )
                }
              >
                <p className="px-2">My Account</p>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm border-l-4 leading-5 outline-none font-medium text-left",
                    selected
                      ? "text-blue-700 border-blue-700"
                      : "text-gray-700 border-white"
                  )
                }
              >
                <p className="px-2">Purchase History</p>
              </Tab>
            </TabList>
          </TabGroup>
        </div>

        <div className="w-3/4 p-4 border-l">
          {selectedTab === 0 && <MyAccountTab userData={userResponse} />}
          {selectedTab === 1 && (
            <PurchaseHistoryTab purchasedDatasets={purchasedDatasets} />
          )}
        </div>
      </div>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<SettingPageProps> = async (
  context
) => {
  const authToken = getCookie(ACCESS_TOKEN, context.req.headers.cookie);

  const isLoggedIn = !!authToken;

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const fetchUserPromise = authToken
    ? fetchUserData(authToken)
    : Promise.resolve({ data: null, error: null });
  const fetchPurchasedDatasetsPromise = authToken
    ? fetchBoughtDatasets(authToken)
    : Promise.resolve({ data: null, error: null });

  const [userResponse, purchasedDatasets] = await Promise.all([
    fetchUserPromise,
    fetchPurchasedDatasetsPromise,
  ]);

  return {
    props: {
      isLoggedIn,
      jwtToken: authToken,
      userResponse: userResponse.data,
      purchasedDatasets,
    },
  };
};
