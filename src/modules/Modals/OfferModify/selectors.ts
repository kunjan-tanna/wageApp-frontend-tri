import { IStoreState } from '../../../store';
import { IOfferModifyModalState } from './types';

const offerModifyFormSelector = (state: IStoreState): IOfferModifyModalState => {
  return state.modals.OfferModifyForm;
};

export {
  offerModifyFormSelector
}