import { RouteComponentProps } from 'react-router';
import { ICurrentUser } from '../../modules/CurrentUser/types';
import { Actions as FileUploadActions, offerFormUploadReset } from '../../modules/FileUpload/actions';
import { Actions as OfferModifyActions, offerModifyModalClose } from '../../modules/Modals/OfferModify/actions';
import { IOfferModifyModalState } from '../../modules/Modals/OfferModify/types';
import { Actions as OfferActions, offerRequest } from '../../modules/Offer/actions';
import { IOfferDetails } from '../../modules/Offer/types';
import { Actions as OfferFormActions, editTaskRequest } from '../../modules/OfferForm/actions';

export interface IExternalProps {
  currentUser: ICurrentUser;
  offer: IOfferDetails;
  offerModifyModal: IOfferModifyModalState;
  offerRequesting: boolean;
}

export interface IDispatchProps {
  editTaskRequest: typeof editTaskRequest;
  offerFormUploadReset: typeof offerFormUploadReset;
  offerModifyModalClose: typeof offerModifyModalClose;
  offerRequest: typeof offerRequest;
}

interface IMatchProps {
  offerId: string;
}

export interface IProps extends IExternalProps, IDispatchProps, RouteComponentProps<IMatchProps> {
}

export type Actions = FileUploadActions | OfferModifyActions | OfferActions | OfferFormActions;