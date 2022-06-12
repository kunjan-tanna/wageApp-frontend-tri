import { RequestPayload as GetUserOffersRequestPayload } from '../../../../modules/UserOffers/types';
import { IOffersList, OfferType } from '../../../../types/offers';

export interface IProps {
  type: OfferType;
  ownerId?: string;
  userOffersRequest: (payload: GetUserOffersRequestPayload) => void;
  offers: IOffersList;
  requesting: boolean;
}
