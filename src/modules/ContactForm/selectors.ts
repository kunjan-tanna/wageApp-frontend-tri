import {
  IContactFormStoreState,
} from './types';

const isRequestingSelector = (state: IContactFormStoreState): boolean => {
  return state.requesting;
};

export {
  isRequestingSelector
};
