import { IDeleteAccountState } from '../../../../../../modules/CurrentUser/types';

export interface IProps {
  handleSubmit: () => void;
  deleteAccount: IDeleteAccountState;
  toggleConfirmation: () => void;
  isDeleteConfirmation: boolean;
}
