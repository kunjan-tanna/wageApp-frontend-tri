import { ISingleMessage } from '../../../../../../modules/Chat/types';

export interface IProps {
  item: ISingleMessage;
  currentUserId: string;
  avatar: string;
  sendMessage: () => void;
  time: string;
  isdeleted: boolean;
  senderType: string;
}
