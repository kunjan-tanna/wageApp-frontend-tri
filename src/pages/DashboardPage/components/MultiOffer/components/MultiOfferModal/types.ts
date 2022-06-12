import { IOffer } from '../../../../../../modules/MultiuploadOffers/types';

export interface IProps {
  offers: IOffer[];
  isOpen: boolean;
  closeModal: () => void;
}
