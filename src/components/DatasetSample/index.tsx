import React from "react";
import { Dataset } from "@components/types/datasetSample";

interface DatasetSampleProps {
  dataset: Dataset | null;
}

const DatasetSample: React.FC<DatasetSampleProps> = ({ dataset }) => {
  return (
    <div className="overflow-x-auto max-h-[600px] relative border sm:rounded">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {dataset &&
              Object.entries(dataset.columns).map(([key, value]) => (
                <th key={key} scope="col" className="py-3 px-4 ">
                  {value}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {dataset &&
            dataset.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white text-gray-700 border-b hover:bg-gray-50"
              >
                {Object.keys(dataset.columns).map((columnKey, columnIndex) => {
                  const cellValue: any = row[columnKey as keyof typeof row];
                  if (columnKey.includes("URL")) {
                    return (
                      <td key={columnIndex} className="py-2 px-4">
                        <a
                          href={cellValue}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Source
                        </a>
                      </td>
                    );
                  } else {
                    return (
                      <td key={columnIndex} className="py-2 px-6">
                        {cellValue}
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatasetSample;
