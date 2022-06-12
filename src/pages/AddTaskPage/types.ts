import { RouteComponentProps } from 'react-router';
import { ICurrentUser } from '../../modules/CurrentUser/types';
import { offerFormUploadReset } from '../../modules/FileUpload/actions';
import { offerModifyModalClose } from '../../modules/Modals/OfferModify/actions';
import { IOfferModifyModalState } from '../../modules/Modals/OfferModify/types';
import { addTaskRequest } from '../../modules/OfferForm/actions';
import { OfferType } from '../../types/offers';

export interface IExternalProps {
  currentUser: ICurrentUser;
  offerModifyModal: IOfferModifyModalState;
}

export interface IDispatchProps {
  addTaskRequest: typeof addTaskRequest;
  offerFormUploadReset: typeof offerFormUploadReset;
  offerModifyModalClose: typeof offerModifyModalClose;
}

export interface IState {
  offerType: OfferType;
}

export interface IProps extends IExternalProps, IDispatchProps, RouteComponentProps {
}
