"use client";

import { format } from "date-fns";
import { Calendar, Plane, Search, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationCombobox from "@/components/ui/location-combobox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { locations } from "@/data/locations";
import { cn } from "@/lib/utils";
import type { BusShuttleProps } from "@/types";

const BusShuttleForm = ({ data, onFormChange }: BusShuttleProps) => {
  const router = useRouter();

  // Hàm đổi chỗ From To
  const swapLocations = () => {
    onFormChange("to", data.from);
    onFormChange("from", data.to);
  };

  const buildQueryString = (data: {
    [x: string]: any;
    mode?: string;
    departDate?: Date | undefined;
    returnDate?: Date | undefined;
    isRoundTrip?: boolean;
    from?: string;
    to?: string;
    noOfPassengers?: number;
  }) => {
    const params = new URLSearchParams();

    // Lặp qua các cặp key-value trong formData
    for (const key in data) {
      let value = data[key];

      // Xử lý Date objects (chuyển thành ISO string hoặc định dạng mong muốn)
      if (value instanceof Date) {
        value = value.toISOString();
      }
      // Xử lý boolean
      if (typeof value === "boolean") {
        value = value.toString();
      }
      // Bỏ qua các trường không cần thiết hoặc không có giá trị
      if (value !== null && value !== undefined && value !== "") {
        params.append(key, value);
      }
    }
    return params.toString();
  };

  const handleSearch = () => {
    // Thêm mode (ví dụ: 'bus') vào dữ liệu
    const dataToSend = { ...data, mode: "bus" };

    // 1. Chuyển đổi object thành chuỗi truy vấn (ví dụ: from=Hanoi&to=HCM&...)
    const queryString = buildQueryString(dataToSend);

    // 2. Điều hướng đến trang /search với chuỗi truy vấn
    router.push(`/search?${queryString}`);
  };
  return (
    <div className="bg-white rounded-2xl p-8">
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 flex-grow-[2] w-full">
          {/* FROM */}
          <div className="flex-1">
            <Label htmlFor="from" className="text-xs font-medium text-gray-600">
              FROM
            </Label>
            <div className="relative mt-3">
              <LocationCombobox
                value={data.from}
                onChange={(val) => onFormChange("from", val)}
                placeholder="Enter city, terminal..."
                locations={locations}
                label="FROM"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center md:flex-none order-first md:order-none self-end">
            <Button
              onClick={swapLocations}
              size="icon"
              variant="ghost"
              className="mt-6 rounded-full bg-white shadow-md
              hover:bg-gray-50 border border-gray-200 h-[48px] w-[48px]"
            >
              <Image
                src="/images/icons/arrow-right-left.svg"
                alt=""
                width="24"
                height="24"
              />
            </Button>
          </div>

          {/* TO */}
          <div className="flex-1">
            <Label htmlFor="to" className="text-xs font-medium text-gray-600">
              TO
            </Label>
            <div className="relative mt-3">
              <LocationCombobox
                value={data.to}
                onChange={(val) => onFormChange("to", val)}
                placeholder="Enter city, terminal..."
                locations={locations}
                label="TO"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4 flex-grow-[2] w-full">
          {/* DEPARTURE DATE */}
          <div className="flex-1 ">
            <Label className="text-xs font-medium text-gray-600 ">
              DEPARTURE DATE
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 mt-3 justify-start text-left font-normal rounded-xl border-gray-200",
                    !data.departDate && "text-muted-foreground",
                  )}
                >
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  {data.departDate
                    ? format(data.departDate, "dd / MM / yyyy")
                    : "DD / MM / YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={data.departDate}
                  onSelect={(date) => onFormChange("departDate", date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          {/* ROUND TRIP */}
          <div className="flex-1 flex flex-col gap-1">
            {/* 1. HÀNG 1: CHECKBOX và LABEL (Nằm ở trên) */}
            <div className="flex items-center space-x-2 h-6 mt-1 md:mt-0">
              {/* Đặt chiều cao nhỏ để căn chỉnh tốt hơn */}
              <Checkbox
                id="roundtrip"
                checked={data.isRoundTrip}
                onCheckedChange={(checked) =>
                  onFormChange("isRoundTrip", checked as boolean)
                }
                className="rounded text-blue-500 border-gray-300"
              />
              <Label
                htmlFor="roundtrip"
                className="text-xs font-medium text-gray-600"
              >
                ROUND TRIP?
              </Label>
            </div>

            {/* 2. HÀNG 2: INPUT/POPOVER (Nằm ở dưới) */}
            {/* Chúng ta sẽ bỏ div: md:col-span-2 vì nó đã được bọc bởi md:col-span-3 cha */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal rounded-lg border-gray-300 shadow-sm",
                    // Style khi có giá trị
                    !data.returnDate && "text-muted-foreground",
                    // Style khi bị DISABLED
                    !data.isRoundTrip &&
                      "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200",
                  )}
                  // THUỘC TÍNH DISABLED QUAN TRỌNG
                  disabled={!data.isRoundTrip}
                >
                  <Calendar
                    className={cn(
                      "mr-2 h-5 w-5",
                      !data.isRoundTrip ? "text-gray-400" : "text-gray-600",
                    )}
                  />
                  {data.returnDate
                    ? format(data.returnDate, "dd / MM / yyyy")
                    : "DD / MM / YYYY"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={data.returnDate}
                  onSelect={(date) => onFormChange("returnDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* NO. OF PASSENGERS */}
        <div className="flex-grow flex-shrink min-w-[150px] md:w-auto w-full">
          <Label
            htmlFor="noOfPassengers"
            className="text-xs font-medium text-gray-600"
          >
            NO. OF PASSENGERS
          </Label>
          <div className="relative mt-2">
            <User
              fill="black"
              className="absolute left-3 top-3 h-5 w-5 text-gray-400 "
            />
            <Input
              id="noOfPassengers"
              type="number"
              defaultValue={data.noOfPassengers}
              min={1}
              onChange={(e) =>
                onFormChange("noOfPassengers", Number(e.target.value))
              }
              className="pl-10 h-12 text-base rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-[#19C0FF] w-ful"
            ></Input>
          </div>
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSearch}
          className="h-14 w-50 px-12 text-lg font-semibold rounded-full bg-[#19C0FF] hover:bg-[#3BC9FF] text-white shadow-lg"
        >
          <Search />
          SEARCH
        </Button>
      </div>
    </div>
  );
};

export default BusShuttleForm;
