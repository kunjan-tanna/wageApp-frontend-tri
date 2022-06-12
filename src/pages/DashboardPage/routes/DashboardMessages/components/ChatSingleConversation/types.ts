import { RouteComponentProps } from 'react-router';
import { IOfferReportState } from '../../../../../../modules/Offer/types';
import { ICurrentUser } from '../../../../../../modules/CurrentUser/types';
interface IMatchParams {
  conversationId: string;
}

export interface IProps extends IExternalProps, RouteComponentProps<IMatchParams> {
  currentUserId: string;
  report: IOfferReportState;
}

export interface IExternalProps {
  user: ICurrentUser;
}
