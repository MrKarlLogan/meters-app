import { Area } from '@/types/api';
import { makeAutoObservable } from 'mobx';

export class AreaStore {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  address: string;

  constructor(apiArea: Area) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.id = String(apiArea.id);
    this.number = apiArea.number;
    this.str_number = apiArea.str_number;
    this.str_number_full = apiArea.str_number_full;
    this.address = `${apiArea.house.address}, ${apiArea.str_number_full}`;
  }

  get fullAddress() {
    return `${this.address}`;
  }
}

export const createAreaModelFromApi = (apiArea: Area) => {
  return new AreaStore(apiArea);
};
