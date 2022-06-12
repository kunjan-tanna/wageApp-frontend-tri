import { IMultiOffersState } from '../../../../../../modules/MultiuploadOffers/types';

export interface IProps {
  status: IMultiOffersState;
  closeModal: () => void;
}
