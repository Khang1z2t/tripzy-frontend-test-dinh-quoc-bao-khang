"use client";

import Image from "next/image";
import { useState } from "react";
import BusShuttleForm from "@/components/sections/bus-shuttle-form";
import FlightForm from "@/components/sections/flight-form";
import HotelAccommodationForm from "@/components/sections/hotel-accommodation-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BusFormData } from "@/types";

const HeroSearchForm = () => {
  const [busData, setBusData] = useState<BusFormData>({
    departDate: undefined,
    returnDate: undefined,
    isRoundTrip: false,
    from: "",
    to: "",
    noOfPassengers: 1,
  });

  const handleBusChange = (name: keyof BusFormData, value: any) => {
    setBusData((prevData) => ({
      ...prevData, // Giữ lại các giá trị cũ
      [name]: value, // Cập nhật giá trị mới cho thuộc tính được chỉ định
    }));
  };

  return (
    <div className="bg-white p-2 rounded-xl shadow-2xl border border-blue-100">
      {/*  Các Tabs*/}
      <Tabs defaultValue="bus" className="w-full">
        {/* TABS LIST (Vùng chứa các nút trigger) */}
        <TabsList className="flex flex-col md:flex-row justify-between w-full border-gray-200 pb-4 h-auto bg-white p-0 rounded-lg shadow-md">
          {/* Bus & Shuttle Tab */}
          <TabsTrigger
            value="bus"
            className="flex flex-1 items-center justify-start space-x-2 p-3 h-auto
                   data-[state=active]:bg-[#EBF9FF] font-medium text-gray-500 hover:bg-gray-50
                   transition duration-150 rounded-lg w-full md:w-auto mt-2 md:mt-0"
          >
            {/*<Bus className="w-5 h-5" />*/}
            <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#D3F3FF] rounded-full">
              <Image
                src="/images/icons/bus.svg"
                alt="Bus & Shuttle"
                width="28"
                height="28"
              />
            </div>
            <span>Bus & Shuttle</span>
          </TabsTrigger>

          {/* Hotel Tab */}
          <TabsTrigger
            value="hotel"
            className="flex flex-1 items-center justify-start space-x-2 p-3 h-auto
            data-[state=active]:bg-[#F4FFEB]  font-medium text-gray-500 hover:bg-gray-50
            transition duration-150 rounded-lg w-full md:w-auto mt-2 md:mt-0"
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#E8FBCC] rounded-full">
              <Image
                src="/images/icons/hotel.svg"
                alt="Hotel & Accommodation"
                width="28"
                height="28"
              />
            </div>
            <span>Hotel & Accommodation</span>
          </TabsTrigger>

          {/* Flight Tab */}
          <TabsTrigger
            value="flight"
            className="flex flex-1 items-center justify-start space-x-2 p-3 h-auto
            data-[state=active]:bg-[#EBF4FF]  font-medium text-gray-500 hover:bg-gray-50
            transition duration-150 rounded-lg w-full md:w-auto mt-2 md:mt-0"
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#E1EDFE] rounded-full">
              <Image
                src="/images/icons/fight.svg"
                alt="Flight"
                width="28"
                height="28"
              />
            </div>
            <span>Flight</span>
          </TabsTrigger>
        </TabsList>
        {/* Tabs content */}
        <div className="py-6">
          <TabsContent value="bus">
            <BusShuttleForm data={busData} onFormChange={handleBusChange} />
          </TabsContent>
          <TabsContent value="hotel">
            <HotelAccommodationForm />
          </TabsContent>
          <TabsContent value="flight">
            <FlightForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HeroSearchForm;
