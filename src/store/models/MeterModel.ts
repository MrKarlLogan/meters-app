import { types, flow, getParent, Instance } from 'mobx-state-tree';
import { AreaModel } from './AreaModel';
import { meterApi } from '@/api/meterApi';
import { RootStore } from './RootStore';
import { Meter } from '@/types/api';

export const MeterModel = types
  .model('MeterModel', {
    id: types.identifier,
    number: types.number,
    type: types.string,
    installationDate: types.string,
    isAutomatic: types.string,
    value: types.number,
    description: types.string,
    areaId: types.string,
    area: types.maybe(types.reference(AreaModel)),
  })
  .actions((self) => ({
    // В ТЗ точно не указано как нужно обновить страницу после удаления. Пошел путем полного обновления списка. В качестве альтернативы, можно брать первый на следующей странице и его добавлять.
    delete: flow(function* (): Generator<Promise<unknown>, void, unknown> {
      try {
        yield meterApi.deleteMeter(self.id);
        const parent = getParent<typeof RootStore>(self, 2);
        parent.removeMeter(self.id);

        yield parent.loadMeters(parent.currentPage);
      } catch (error) {
        console.error('Ошибка удаления:', error);
      }
    }),
  }));

export type IMeterModel = Instance<typeof MeterModel>;

export const createMeterModelFromApi = (
  apiMeter: Meter,
  index: number,
  offset: number
) => {
  return MeterModel.create({
    id: apiMeter.id,
    number: offset + index + 1,
    type: apiMeter._type.includes('ColdWaterAreaMeter') ? 'ХВС' : 'ГВС',
    installationDate: new Date(apiMeter.installation_date).toLocaleDateString(
      'ru-RU'
    ),
    isAutomatic:
      apiMeter.is_automatic === null
        ? '-'
        : apiMeter.is_automatic
          ? 'да'
          : 'нет',
    value: apiMeter.initial_values[0] || 0,
    description: apiMeter.description || '-',
    areaId: String(apiMeter.area.id),
  });
};
