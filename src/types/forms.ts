// Bus and Shuttle Form Data Interface
interface BusFormData {
  departDate?: Date;
  returnDate?: Date;
  isRoundTrip: boolean;
  from: string;
  to: string;
  noOfPassengers: number;
}

interface BusShuttleProps {
  data: BusFormData;
  onFormChange: (name: keyof BusFormData, value: any) => void;
}

// Location Interface and Props for Combobox
interface Location {
  short_code: string;
  english_name: string;
  code_state: string;
}

interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  locations: Location[]; // Dữ liệu JSON bạn cung cấp
  label: string;
}

export type { BusFormData, BusShuttleProps, Location, LocationComboboxProps };
