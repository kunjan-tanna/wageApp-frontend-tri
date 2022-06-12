import { INotification } from '../../../../modules/Notifications/types';

export interface IProps {
  onClickOutside: () => void;
  isOpen: boolean;
  items: INotification[];
  showAllLink: string;
  noItemsText: string;
}