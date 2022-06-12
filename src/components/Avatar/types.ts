import { AccountType, Nullable } from '../../types';

export interface IProps {
  avatarUrl: Nullable<string>;
  accountType?: any;
  name?: string;
  unread?: boolean;
}
