import { IDashboardOfferStatus } from '../../../../data/static/dashboard-offer-statuses';

export interface IProps {
  offersTypes: IDashboardOfferStatus[];
  selectedOfferId: number;
  changeOfferType: (id: number) => void;
}
