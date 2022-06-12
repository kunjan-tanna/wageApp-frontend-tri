import { IDashboardOfferStatus } from '../../../../data/static/dashboard-offer-statuses';

export interface IProps {
  offersStatuses: IDashboardOfferStatus[];
  selectedOfferId: number;
  offersCount: number;
}
