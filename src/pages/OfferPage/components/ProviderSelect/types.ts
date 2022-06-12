import { IOfferBidder, IOfferBiddersList } from '../../../../modules/OfferBidders/types';

export interface IProps {
  data: IOfferBiddersList;
  selectHandler: (user?: IOfferBidder) => void;
};

export interface IProviderItem {
  userId: string;
  label: string;
  imageUrl: string;
};
