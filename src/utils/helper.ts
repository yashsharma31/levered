import { anyPass, complement, isEmpty, isNil } from "ramda";

export const isNilOrEmpty = anyPass([isNil, isEmpty]);

export const isPresent = complement(isNilOrEmpty);

export function formatDate(isoDateStr: Date): string {
  const date = new Date(isoDateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: "long", // "long" for full month name.
    day: "numeric", // "numeric" for day of the month.
    year: "numeric", // "numeric" for year in 4 digits.
  };
  return date.toLocaleDateString("en-US", options);
}

export const objectToFormattedString = (obj: Record<string, any>): string => {
  const keyValuePairs = Object.entries(obj).map(([key, value]) => {
    const formattedValue = typeof value === "string" ? `"${value}"` : value;
    return `"${key}": ${formattedValue}`;
  });

  return keyValuePairs.join(",\n");
};

export async function fetchAPI<T>(
  url: string,
  data: any
): Promise<{ body: T | null; status: number }> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  const body = await response.json().catch(() => null); // Gracefully handle invalid JSON response

  return { body, status: response.status };
}

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
