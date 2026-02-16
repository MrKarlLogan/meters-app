export interface Meter {
  id: string;
  _type: Array<'ColdWaterAreaMeter' | 'HotWaterAreaMeter' | 'AreaMeter'>;
  area: {
    id: string;
  };
  is_automatic: boolean | null;
  description: string;
  installation_date: string;
  initial_values: number[];
}

export interface MetersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meter[];
}

export interface Area {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
    fias_addrobjs: string[];
  };
}

export interface AreasResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Area[];
}
