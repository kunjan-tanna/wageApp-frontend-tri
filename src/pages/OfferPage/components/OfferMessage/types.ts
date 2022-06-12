import { IOfferDetails } from '../../../../modules/Offer/types';
import { IFormValues } from '../ChatMessageForm/types';

export interface IProps {
  offer: IOfferDetails;
  modalState: boolean;
  closeModal: () => void;
  messageHandler: (values: IFormValues, actions: any) => void;
  messageSent: boolean;
  closeThanksMessage: () => void;
  responseStatus: number;
  error: boolean;
}
