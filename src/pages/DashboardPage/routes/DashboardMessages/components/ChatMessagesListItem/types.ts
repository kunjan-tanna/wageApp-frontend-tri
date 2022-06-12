import { AccountType, Nullable } from '../../../../../../types';
import { OfferType } from '../../../../../../types/offers';

export interface IProps {
  id: number;
  accountType: AccountType;
  firstName: Nullable<string>;
  businessName: Nullable<string>;
  coverPhotoUrl: Nullable<string>;
  title: string;
  date: any;
  type: OfferType;
  avatarUrl: Nullable<string>;
  read: boolean;
  currentUserId: any;
}
