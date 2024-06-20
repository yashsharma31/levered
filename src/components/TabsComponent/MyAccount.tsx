import { updateUserAccountData } from "@components/services/updateUserData";
import { useForm } from "@mantine/form";
import { TextInput, Button, Notification, Loader } from "@mantine/core";
import { useState } from "react";

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
  jwtToken,
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
  jwtToken: string;
}) {
  const [notification, setNotification] = useState<{
    message: string;
    color: "red" | "green";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
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

  const handleSubmit = async () => {
    setLoading(true);
    const { data, error } = await updateUserAccountData(form.values, jwtToken);
    setLoading(false);

    if (error) {
      setNotification({
        message: `Error updating user account: ${error}`,
        color: "red",
      });
    } else {
      setNotification({
        message: "User account updated successfully!",
        color: "green",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-8">
      <div className="gap-8 grid grid-cols-2">
        <TextInput
          label="Name"
          placeholder="Enter your name"
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Company"
          placeholder="Enter your company"
          {...form.getInputProps("company")}
        />
        <TextInput
          label="House Number"
          placeholder="Enter your house number"
          {...form.getInputProps("houseNumber")}
        />
        <TextInput
          label="Street"
          placeholder="Enter your street"
          {...form.getInputProps("street")}
        />
        <TextInput
          label="City"
          placeholder="Enter your city"
          {...form.getInputProps("city")}
        />
        <TextInput
          label="State"
          placeholder="Enter your state"
          {...form.getInputProps("state")}
        />
        <TextInput
          label="Country"
          placeholder="Enter your country"
          {...form.getInputProps("country")}
        />
        <TextInput
          label="Zipcode"
          placeholder="Enter your zipcode"
          {...form.getInputProps("zipcode")}
        />
      </div>
      <div className="flex justify-end px-8 w-full">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? <Loader size="sm" color="white" /> : "Save"}
        </Button>
      </div>
      {notification && (
        <Notification
          color={notification.color}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}
    </form>
  );
}

export default MyAccountTab;
