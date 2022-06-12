import { RouteComponentProps } from 'react-router';
import { IConversation } from '../../modules/Chat/types';
import { ICurrentUser } from '../../modules/CurrentUser/types';
import { INotification } from '../../modules/Notifications/types';

export interface IExternalProps {
  user: ICurrentUser;
  isAuthorized: boolean;
  conversations: IConversation[];
  notifications: INotification[];
  unreadConversations: number;
  unreadNotifications: number;
}

export interface IProps extends IExternalProps, RouteComponentProps {
  items: any[];
  pageurl: any;
}

export interface IState {
  tooltips: {
    [key: string]: boolean;
  };
  conversationIds: any[];
  count: number;
  arr: any[];
}
