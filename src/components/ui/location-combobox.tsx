"use client";

import { Bus, Check } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Location, LocationComboboxProps } from "@/types";

const LocationCombobox = ({
  value,
  onChange,
  placeholder,
  locations,
  label,
}: LocationComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(value);
  const searchValueRef = useRef(searchValue);

  // wrapper to keep state and ref in sync
  const setSearchValueAndRef = (v: string) => {
    searchValueRef.current = v;
    setSearchValue(v);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (value === searchValueRef.current) return;

    if (!value) {
      setSearchValueAndRef("");
      return;
    }

    const selectedLocation = locations.find(
      (loc) => loc.english_name === value,
    );

    if (selectedLocation) {
      setSearchValueAndRef(selectedLocation.english_name);
    } else {
      setSearchValueAndRef(value);
    }
  }, [value, locations]);

  const filteredLocations = useMemo(() => {
    if (!searchValue) return locations;

    const lowerCaseSearch = searchValue.toLowerCase();
    return locations.filter(
      (location) =>
        location.english_name.toLowerCase().includes(lowerCaseSearch) ||
        location.short_code.toLowerCase().includes(lowerCaseSearch),
    );
  }, [searchValue, locations]);

  const handleSelect = (currentValue: string) => {
    if (!currentValue) {
      setOpen(false);
      return;
    }

    const normalized = currentValue.toLowerCase();

    let selectedLocation = locations.find(
      (loc) =>
        loc.english_name.toLowerCase() === normalized ||
        loc.short_code.toLowerCase() === normalized,
    );

    if (!selectedLocation && currentValue.includes(" - ")) {
      const [maybeShort, ...rest] = currentValue.split(" - ");
      const maybeName = rest.join(" - ").toLowerCase();

      selectedLocation = locations.find(
        (loc) =>
          loc.short_code.toLowerCase() === maybeShort.toLowerCase() ||
          loc.english_name.toLowerCase() === maybeName,
      );
    }

    if (!selectedLocation) {
      setOpen(false);
      return;
    }

    const valueToDisplay = `${selectedLocation.english_name}`;

    onChange(selectedLocation.english_name);
    setSearchValue(valueToDisplay);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* 1. INPUT TRIGGER (Phần luôn hiển thị) */}
      <PopoverTrigger asChild>
        <div className="relative">
          <Bus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
          <Input
            id={label.toLowerCase()}
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onClick={() => setOpen(true)}
            autoComplete="off"
            // Áp dụng style input tùy chỉnh
            className="pl-10 h-12 text-base rounded-xl border-gray-200 shadow-sm pr-4
                         focus-visible:ring-2 focus-visible:ring-[#19C0FF] w-full"
          />
        </div>
      </PopoverTrigger>

      {/* 2. POPOVER CONTENT (Phần danh sách gợi ý) */}
      <PopoverContent
        className="w-80 p-0 mt-2 shadow-xl border-gray-100 rounded-xl"
        align="start"
        // style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandList className="max-h-60">
            <CommandEmpty>Address unavailable</CommandEmpty>

            <CommandGroup>
              {filteredLocations.map((location) => (
                <CommandItem
                  key={location.short_code}
                  // Giá trị được lưu vào form là English Name
                  value={location.english_name}
                  onSelect={handleSelect}
                  className="p-3 cursor-pointer text-base data-[state=selected]:bg-gray-100"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {location.short_code} - {location.english_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {location.code_state}
                    </span>
                  </div>

                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === location.english_name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LocationCombobox;
