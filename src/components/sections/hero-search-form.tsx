"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  Bus,
  Calendar,
  Plane,
  Search,
  User,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BusShuttleForm = () => {
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Hàm đổi chỗ From ↔ To
  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* FROM */}
          <div className="md:col-span-3">
            <Label htmlFor="from" className="text-xs font-medium text-gray-600">
              FROM
            </Label>
            <div className="relative mt-2">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="from"
                placeholder="Enter city, terminal..."
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-10 h-12 text-base rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center -mb-4">
            <Button
              onClick={swapLocations}
              size="icon"
              variant="ghost"
              className="rounded-full bg-white shadow-md hover:bg-gray-50 border border-gray-200 h-10 w-10"
            >
              <ArrowLeftRight className="h-5 w-5 text-blue-600" />
            </Button>
          </div>

          {/* TO */}
          <div className="md:col-span-3">
            <Label htmlFor="to" className="text-xs font-medium text-gray-600">
              TO
            </Label>
            <div className="relative mt-2">
              <Plane className="absolute left-3 top-3 h-5 w-5 text-gray-400 rotate-90" />
              <Input
                id="to"
                placeholder="Enter city, terminal..."
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-10 h-12 text-base rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* DEPARTURE DATE */}
          <div className="md:col-span-2">
            <Label className="text-xs font-medium text-gray-600">
              DEPARTURE DATE
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 mt-2 justify-start text-left font-normal rounded-xl border-gray-200",
                    !departDate && "text-muted-foreground",
                  )}
                >
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  {departDate
                    ? format(departDate, "dd / MM / yyyy")
                    : "DD / MM / YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={departDate}
                  onSelect={setDepartDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* RETURN DATE (chỉ hiện khi round trip) */}
          {isRoundTrip && (
            <div className="md:col-span-2">
              <Label className="text-xs font-medium text-gray-600 invisible">
                RETURN
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 mt-2 justify-start text-left font-normal rounded-xl border-gray-200",
                      !returnDate && "text-muted-foreground",
                    )}
                  >
                    <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                    {returnDate
                      ? format(returnDate, "dd / MM / yyyy")
                      : "DD / MM / YYYY"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* ROUND TRIP & PASSENGERS */}
          <div className="md:col-span-3 md:col-start-10 flex items-center gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="roundtrip"
                checked={isRoundTrip}
                onCheckedChange={(checked) =>
                  setIsRoundTrip(checked as boolean)
                }
              />
              <Label
                htmlFor="roundtrip"
                className="text-sm font-medium cursor-pointer"
              >
                Round trip?
              </Label>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-600">
                NO. OF PASSENGERS
              </Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-20 h-12 mt-2 rounded-xl">
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <SelectItem key={n} value={n.toString()}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div className="mt-8 flex justify-center">
          <Button className="h-14 px-12 text-lg font-semibold rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
            <Search />
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
};

const HotelAccommodationForm = () => {
  return (
    <div className="flex items-center justify-center h-40 font-medium text-[#767689] text-sm">
      No data
    </div>
  );
};

const FlightForm = () => {
  return (
    <div className="flex items-center justify-center h-40 font-medium text-[#767689] text-sm">
      No data
    </div>
  );
};

const HeroSearchForm = () => {
  return (
    <div className="bg-white p-2 rounded-xl shadow-2xl border border-blue-100">
      {/*  Các Tabs*/}
      <Tabs defaultValue="bus" className="w-full">
        {/* TABS LIST (Vùng chứa các nút trigger) */}
        <TabsList className="flex justify-between w-full border-gray-200 pb-4 h-auto bg-white p-0 rounded-lg shadow-md">
          {/* Bus & Shuttle Tab */}
          <TabsTrigger
            value="bus"
            className="flex flex-1 items-center justify-start space-x-2 p-3 h-auto data-[state=active]:bg-[#EBF9FF] font-medium text-gray-500 hover:bg-gray-50 transition duration-150 rounded-lg"
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
            className="flex flex-1 items-center justify-start space-x-2 p-3 h-auto data-[state=active]:bg-[#F4FFEB]  font-medium text-gray-500 hover:bg-gray-50 transition duration-150 rounded-lg"
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
            className="flex flex-1 items-center justify-start space-x-2 p-3 h-auto data-[state=active]:bg-[#EBF4FF]  font-medium text-gray-500 hover:bg-gray-50 transition duration-150 rounded-lg"
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
            <BusShuttleForm />
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
