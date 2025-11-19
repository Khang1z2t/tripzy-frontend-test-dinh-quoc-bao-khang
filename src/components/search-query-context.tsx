"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { BusFormData } from "@/types";

export const dynamic = "force-dynamic";

const parseValue = (key: keyof BusFormData, value: string): any => {
  switch (key) {
    case "departDate":
    case "returnDate":
      // Date được lưu dưới dạng ISO String, cần chuyển lại thành Date Object
      return new Date(value);
    case "isRoundTrip":
      // Boolean được lưu dưới dạng chuỗi "true" hoặc "false"
      return value === "true";
    case "noOfPassengers":
      // Number được lưu dưới dạng chuỗi, cần chuyển thành số
      return Number(value);
    default:
      return value;
  }
};

const initialFormData: BusFormData = {
  from: "N/A",
  to: "N/A",
  departDate: undefined,
  returnDate: undefined,
  isRoundTrip: false,
  noOfPassengers: 1,
};

const SearchQueryContext = () => {
  const searchParams = useSearchParams();

  const [searchData, setSearchData] = useState<BusFormData | null>(null);

  useEffect(() => {
    if (!searchParams) return;

    const newData: Partial<BusFormData> = {};

    // Lặp qua các cặp key-value trong URL
    for (const [key, value] of searchParams.entries()) {
      // Đảm bảo key là key hợp lệ của BusFormData
      if (key in initialFormData) {
        // Giả sử initialFormData là một bản mẫu
        const typedKey = key as keyof BusFormData;
        newData[typedKey] = parseValue(typedKey, value);
      }
    }

    // Áp dụng giá trị mặc định cho các trường còn thiếu (nếu cần)
    setSearchData(newData as BusFormData);
    console.log("Parsed search data:", newData);
  }, [searchParams]); // Phụ thuộc vào searchParams

  return (
    <>
      {searchData ? (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
            Search Results
          </h2>

          <div className="space-y-4 text-gray-700">
            {/* FROM & TO SECTION */}
            <div className="grid grid-cols-2 gap-4 border-b pb-4 border-gray-100">
              {/* FROM */}
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase text-gray-500 mb-1">
                  From
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {searchData.from}
                </span>
              </div>

              {/* TO */}
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase text-gray-500 mb-1">
                  To
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {searchData.to}
                </span>
              </div>
            </div>

            {/* DATE SECTION */}
            <div className="grid grid-cols-2 gap-4 border-b pb-4 border-gray-100">
              {/* DEPARTURE DATE */}
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase text-gray-500 mb-1">
                  Departure Date
                </span>
                <span className="text-base font-medium">
                  {searchData.departDate
                    ? searchData.departDate.toDateString()
                    : "N/A"}
                </span>
              </div>

              {/* RETURN DATE (Highlighted if Round Trip) */}
              <div className="flex flex-col">
                <span
                  className={`text-xs font-medium uppercase mb-1 ${searchData.isRoundTrip ? "text-blue-600" : "text-gray-500"}`}
                >
                  Return Date {searchData.isRoundTrip && "(Round Trip)"}
                </span>
                <span
                  className={`text-base font-medium ${!searchData.isRoundTrip && "italic text-gray-400"}`}
                >
                  {searchData.returnDate
                    ? searchData.returnDate.toDateString()
                    : searchData.isRoundTrip
                      ? "N/A"
                      : "One-way"}
                </span>
              </div>
            </div>

            {/* PASSENGER COUNT */}
            <div className="flex items-center pt-2 pb-1 ">
              <span className="text-base font-medium text-gray-600 mr-2">
                No. of Passengers:
              </span>
              <span className="text-lg font-bold text-[#1E3A8A] ">
                {searchData.noOfPassengers}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </>
  );
};

export default SearchQueryContext;
