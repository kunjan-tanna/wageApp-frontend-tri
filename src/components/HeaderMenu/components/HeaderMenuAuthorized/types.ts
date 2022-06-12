import H from 'history';

import { IConversation } from '../../../../modules/Chat/types';
import { ICurrentUser } from '../../../../modules/CurrentUser/types';
import { INotification } from '../../../../modules/Notifications/types';

export interface IProps {
  conversations: IConversation[];
  notifications: INotification[];
  unreadConversations: number;
  unreadNotifications: number;
  user: ICurrentUser;
  toggleTooltip: (name: string) => void;
  tooltips: {
    [key: string]: boolean;
  };
  history: H.History;
  pageurl: any;
  conversationIds: any[];
}
