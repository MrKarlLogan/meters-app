import { makeAutoObservable } from 'mobx';
import { Meter } from '@/types/api';
import { RootStore } from './RootStore.store';
import { meterApi } from '@/api/meterApi';

export class MeterStore {
  id: string;
  number: number;
  type: string;
  installationDate: string;
  isAutomatic: string;
  value: number;
  description: string;
  areaId: string;

  private rootStore: RootStore;

  constructor(
    apiMeter: Meter,
    index: number,
    offset: number,
    rootStore: RootStore
  ) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.rootStore = rootStore;
    this.id = apiMeter.id;
    this.number = offset + index + 1;
    this.type = apiMeter._type.includes('ColdWaterAreaMeter') ? 'ХВС' : 'ГВС';
    this.installationDate = new Date(
      apiMeter.installation_date
    ).toLocaleDateString('ru-RU');
    this.isAutomatic =
      apiMeter.is_automatic === null
        ? '-'
        : apiMeter.is_automatic
          ? 'да'
          : 'нет';
    this.value = apiMeter.initial_values[0] || 0;
    this.description = apiMeter.description || '-';
    this.areaId = String(apiMeter.area.id);
  }

  async delete() {
    try {
      await meterApi.deleteMeter(this.id);
      this.rootStore.removeMeter(this.id);
      await this.rootStore.loadMeters(this.rootStore.currentPage);
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  }

  get area() {
    return this.rootStore.areas.get(this.areaId);
  }
}

export const createMeterModelFromApi = (
  apiMeter: Meter,
  index: number,
  offset: number,
  rootStore: RootStore
) => {
  return new MeterStore(apiMeter, index, offset, rootStore);
};

export type IMeterModel = MeterStore;
