import { IOfferDetails, OfferCompleteRequestPayload } from '../../../../../../modules/Offer/types';
import { IOfferBidder } from '../../../../../../modules/OfferBidders/types';

export interface IProps {
  onBack: () => void;
  user?: IOfferBidder;
  offer: IOfferDetails;
  offerCompleteRequest: (payload: OfferCompleteRequestPayload) => void;
  closeModal: (name: string) => () => void;
}

export interface IState {
  rating: number;
  reason: string[];
  ratingCount: number;
}