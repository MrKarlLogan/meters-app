import { meterApi } from '@/api/meterApi';

//Функция загрузки, которую использовал до Mobx
export const LoadMetesData = async (offset: number = 0, limit: number = 20) => {
  const metersData = await meterApi.getMeters(offset, limit);

  const areaIds = [
    ...new Set(metersData.results.map((meter) => meter.area.id)),
  ];

  const areasData = await meterApi.getAreas(areaIds);
  const areasMap = new Map(areasData.results.map((area) => [area?.id, area]));

  const formattedMeters = metersData.results.map((meter, index) => ({
    id: meter.id,
    number: offset + index + 1,
    // type: в ТЗ лишь ХВС и ГВС, и приходят только они. Проверку на остальные типы из макета не делал.
    type: meter._type.includes('ColdWaterAreaMeter') ? 'ХВС' : 'ГВС',
    installationDate: new Date(meter.installation_date).toLocaleDateString(
      'ru-RU'
    ),
    isAutomatic:
      // isAutomatic: в тестовых запросах приходит только null и false, поэтому делаю такой тернарник.
      meter.is_automatic === null ? '-' : meter.is_automatic ? 'да' : 'нет',
    // value: значения приходят в основном 0, в редких случаях приходят десятичные зн-я где после запятой всё-равно 0. В ТЗ не указано, но я не стал делать через toFixed().
    value: meter.initial_values[0] || 0,
    address: areasMap.get(meter.area.id)
      ? `${areasMap.get(meter.area.id)?.house.address}, ${areasMap.get(meter.area.id)?.str_number_full}`
      : '-',
    // description: тестовые описания приходят странные, но реализация должна быть верная
    description: meter.description || '-',
  }));

  return {
    meters: formattedMeters,
    total: metersData.count,
  };
};
