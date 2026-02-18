import { makeAutoObservable, runInAction } from 'mobx';
import { MeterStore, createMeterModelFromApi } from './Meter.store';
import { AreaStore, createAreaModelFromApi } from './Area.store';
import { Meter, Area } from '@/types/api';
import { meterApi } from '@/api/meterApi';

export class RootStore {
  meters: MeterStore[] = [];
  areas: Map<string, AreaStore> = new Map();
  loading: boolean = false;
  currentPage: number = 1;
  totalCount: number = 0;
  totalPages: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadMeters(page: number = 1) {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const offset = (page - 1) * 20;
      const data = await meterApi.getMeters(offset, 20);

      runInAction(() => {
        this.totalCount = data.count;
        this.totalPages = Math.ceil(data.count / 20);
        this.currentPage = page;
      });

      const results = data.results as Meter[];
      const areaIds = [...new Set(results.map((m) => m.area.id))];

      const areasData = await meterApi.getAreas(areaIds);
      const areaResults = areasData.results as Area[];

      runInAction(() => {
        areaResults.forEach((area) => {
          this.areas.set(String(area.id), createAreaModelFromApi(area));
        });
      });

      const meterModels = results.map((meter, index) =>
        createMeterModelFromApi(meter, index, offset, this)
      );

      runInAction(() => {
        this.meters = meterModels;
      });
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  addMeter(meterModel: MeterStore) {
    this.meters = [...this.meters, meterModel];
  }

  setPage(page: number) {
    this.currentPage = page;
    this.loadMeters(page);
  }

  clear() {
    this.meters = [];
    this.areas.clear();
    this.totalCount = 0;
    this.totalPages = 0;
    this.currentPage = 1;
  }
}

export type IRootStore = RootStore;
