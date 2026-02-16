import { types, flow, cast, Instance } from 'mobx-state-tree';
import { IMeterModel, MeterModel, createMeterModelFromApi } from './MeterModel';
import { AreaModel, createAreaModelFromApi } from './AreaModel';
import { meterApi } from '@/api/meterApi';
import { Meter, Area } from '@/types/api';

export const RootStore = types
  .model('RootStore', {
    meters: types.array(MeterModel),
    areas: types.map(AreaModel),
    loading: types.optional(types.boolean, false),
    currentPage: types.optional(types.number, 1),
    totalCount: types.optional(types.number, 0),
    totalPages: types.optional(types.number, 0),
  })
  .actions((self) => {
    const loadMeters = flow(function* (page: number = 1) {
      self.loading = true;
      try {
        const offset = (page - 1) * 20;
        const data = yield meterApi.getMeters(offset, 20);

        self.totalCount = data.count;
        self.totalPages = Math.ceil(data.count / 20);
        self.currentPage = page;

        const results = data.results as Meter[];
        const areaIds = [...new Set(results.map((m) => m.area.id))];

        const areasData = yield meterApi.getAreas(areaIds);
        const areaResults = areasData.results as Area[];

        areaResults.forEach((area) => {
          self.areas.set(String(area.id), createAreaModelFromApi(area));
        });

        self.meters = cast(
          results.map((meter, index) =>
            createMeterModelFromApi(meter, index, offset)
          )
        );
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        self.loading = false;
      }
    });

    const addMeter = (meterModer: IMeterModel) => {
      self.meters = cast([...self.meters, meterModer]);
    };

    const removeMeter = (id: string) => {
      self.meters = cast(self.meters.filter((m) => m.id !== id));
      self.totalCount -= 1;
      self.totalPages = Math.ceil(self.totalCount / 20);
    };

    const setPage = (page: number) => {
      self.currentPage = page;
      loadMeters(page);
    };

    return {
      loadMeters,
      removeMeter,
      addMeter,
      setPage,
    };
  });

export type IRootStore = Instance<typeof RootStore>;
