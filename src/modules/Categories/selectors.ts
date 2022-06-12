import { ISelectOption } from '../../types';

import {
  ICategoriesStoreState,
  ICategory,
} from './types';

const isRequestingSelector = (state: ICategoriesStoreState): boolean => {
  return state.requesting;
};

const categoriesSelector = (state: ICategoriesStoreState): ICategory[] => {
  return state.list;
}

const categoriesSelectSelector = (state: ICategoriesStoreState): ISelectOption[] => {
  return state.list.map(({ id, name, iconUrl }) => ({ value: id, label: name, image: iconUrl }));
}

export {
  isRequestingSelector,
  categoriesSelector,
  categoriesSelectSelector,
};
