import { RouteComponentProps } from 'react-router';
import { IConversation } from '../../../../../../modules/Chat/types';


export interface IMatchParams {
  conversationId: string;
}

export interface IProps extends RouteComponentProps<IMatchParams> {
  items: IConversation[];
  parentRoute: string;
}