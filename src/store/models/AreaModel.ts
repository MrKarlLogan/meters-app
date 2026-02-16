import { Area } from '@/types/api';
import { types } from 'mobx-state-tree';

export const AreaModel = types.model('AreaModel', {
  id: types.identifier,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
  address: types.string,
});

export const createAreaModelFromApi = (apiArea: Area) => {
  return AreaModel.create({
    id: String(apiArea.id),
    number: apiArea.number,
    str_number: apiArea.str_number,
    str_number_full: apiArea.str_number_full,
    address: `${apiArea.house.address}, ${apiArea.str_number_full}`,
  });
};
