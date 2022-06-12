import { BlockPeopleModalVisibilityChangePayload } from '../../modules/Modals/BlockPeople/types';
import { IUserDetails } from '../../modules/User/types';
import { Nullable } from '../../types';

export interface IUserInfoBoxData extends IUserDetails {
  businessAddressCity?: Nullable<string>;
  businessAddressStreet?: Nullable<string>;
  businessPhoneNumber?: Nullable<string>;
  businessWebAddress?: Nullable<string>;
}

export interface IProps {
  userData: IUserInfoBoxData;
  currentUserId?: string;
  ownerId?: string;
  blockModalVisibilityChange: (payload: BlockPeopleModalVisibilityChangePayload) => void;
  showBusinessDetails?: boolean;
  visibleViewButton?: boolean;
}
