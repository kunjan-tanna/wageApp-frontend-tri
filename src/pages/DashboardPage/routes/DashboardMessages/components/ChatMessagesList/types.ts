import { RouteComponentProps } from 'react-router';
import { IConversation } from '../../../../../../modules/Chat/types';

export interface IProps extends RouteComponentProps {
  items: IConversation[];
  parentRoute: string;
  currentUserId: string;
}
