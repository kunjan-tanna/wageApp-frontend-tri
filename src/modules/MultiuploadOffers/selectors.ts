import { IStoreState } from '../../store';
import { IMultiOffersState } from './types';

const multiUploadOffersSelector = (state: IStoreState): IMultiOffersState => {
  return state.multiUploadOffers;
};

export {
  multiUploadOffersSelector
};
