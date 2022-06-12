import { BlockPeopleModalVisibilityChangePayload } from '../../../../modules/Modals/BlockPeople/types';
import {
  IOfferBiddersList,
  RequestPayload as OfferBiddersRequestPayload
} from '../../../../modules/OfferBidders/types';

export interface IProps {
  offerBidders: IOfferBiddersList;
  offerBiddersRequest: (payload: OfferBiddersRequestPayload) => void;
  offerId: string;
  blockModalVisibilityChange: (payload: BlockPeopleModalVisibilityChangePayload) => void;
}