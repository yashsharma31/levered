import { BoughtDatasetsResponseType } from "@components/types/dataset";

function PurchaseHistoryTab({
  purchasedDatasets,
}: {
  purchasedDatasets: BoughtDatasetsResponseType | { data: null; error: null };
}) {
  if (purchasedDatasets.data === null) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        No data available
      </div>
    );
  }

  const purchaseData = purchasedDatasets.data.map((dataset) => ({
    name: dataset.title,
    price: dataset.price,
  }));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {purchaseData.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${item.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseHistoryTab;
