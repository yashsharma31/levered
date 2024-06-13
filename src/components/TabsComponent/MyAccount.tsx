import { useForm } from "@mantine/form";

interface FormValues {
  name: string;
  email: string;
  company: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

function MyAccountTab({
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
}) {
  const form = useForm({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      company: userData?.company || "",
      houseNumber: userData?.address_house_num || "",
      city: userData?.address_city || "",
      state: userData?.address_state || "",
      country: userData?.address_country || "",
      street: userData?.address_street || "",
      zipcode: userData?.address_zip || "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      zipcode: (value) => (value.length === 5 ? null : "Invalid zipcode"),
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Name
          </label>
          <input
            {...form.getInputProps("name")}
            id="name"
            placeholder="Enter your name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Email
          </label>
          <input
            {...form.getInputProps("email")}
            id="email"
            placeholder="Enter your email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Company
          </label>
          <input
            {...form.getInputProps("company")}
            id="company"
            placeholder="Enter your company"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="houseNumber"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            House Number
          </label>
          <input
            {...form.getInputProps("houseNumber")}
            id="houseNumber"
            placeholder="Enter your house number"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Street
          </label>
          <input
            {...form.getInputProps("street")}
            id="street"
            placeholder="Enter your street"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            City
          </label>
          <input
            {...form.getInputProps("city")}
            id="city"
            placeholder="Enter your city"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            State
          </label>
          <input
            {...form.getInputProps("state")}
            id="state"
            placeholder="Enter your state"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Country
          </label>
          <input
            {...form.getInputProps("country")}
            id="country"
            placeholder="Enter your country"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="zipcode"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Zipcode
          </label>
          <input
            {...form.getInputProps("zipcode")}
            id="zipcode"
            placeholder="Enter your zipcode"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-4 outline-none"
          />
        </div>
      </div>
      <div className="w-full flex justify-end px-8">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-12 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default MyAccountTab;
