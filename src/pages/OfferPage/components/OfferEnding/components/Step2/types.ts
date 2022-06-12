import { IOfferBidder } from '../../../../../../modules/OfferBidders/types';

export interface IProps {
  onBack: () => void;
  user?: IOfferBidder;
  onFinish: () => void;
  onProgress: () => void;
  status: string;
  offerType: string;
}
