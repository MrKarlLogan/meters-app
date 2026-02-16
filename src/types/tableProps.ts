export interface TableMeter {
  id: string;
  number: number;
  type: string;
  installationDate: string;
  isAutomatic: string;
  value: number;
  address: string;
  description: string;
}

export interface CounterTableProps {
  meters: TableMeter[];
  loading: boolean;
  onDelete: (id: string) => void;
}
