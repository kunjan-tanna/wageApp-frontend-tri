import { chatGetConversationsRequest } from '../../../../modules/Chat/actions';
import { IConversation } from '../../../../modules/Chat/types';
import { ICurrentUser } from '../../../../modules/CurrentUser/types';
import { IOfferReportState } from '../../../../modules/Offer/types';

export interface IProps extends IDispatchProps, IExternalProps {}

export interface IDispatchProps {
  getConversationsRequest: typeof chatGetConversationsRequest;
}

export interface IExternalProps {
  allConversations: IConversation[];
  getConversationsError: boolean;
  getConversationsRequesting: boolean;
  currentUser: ICurrentUser;
  report: IOfferReportState;
}
export interface IState {
  conversations: any;
}
