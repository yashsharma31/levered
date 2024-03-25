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
