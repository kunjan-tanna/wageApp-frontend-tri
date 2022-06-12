import { RouteComponentProps } from 'react-router';
import { IWithModalProps } from '../../components/Modal/types';
import { ICurrentUser } from '../../modules/CurrentUser/types';
import H from 'history';

import {
  Actions as FileUploadActions,
  offerFormUploadReset
} from '../../modules/FileUpload/actions';
import {
  Actions as BlockPeopleActions,
  blockPeopleModalVisibilityChange
} from '../../modules/Modals/BlockPeople/actions';
import { BlockPeopleModalVisibilityChangePayload } from '../../modules/Modals/BlockPeople/types';
import {
  Actions as OfferActions,
  offerBidRequest,
  offerBidReset,
  offerCompleteRequest,
  offerReport,
  offerRequest,
  offerSelectBidder,
  offerSendMail,
  offerSetStatusRequest
} from '../../modules/Offer/actions';
import {
  IOfferBidState,
  IOfferDetails,
  IOfferReportPayload,
  IOfferReportState,
  IOfferSendMailPayload,
  OfferBidRequestPayload,
  OfferCompleteRequestPayload,
  OfferSetStatusRequestPayload,
  IOfferRequestPayload
} from '../../modules/Offer/types';
import {
  Actions as OfferBiddersActions,
  offerBiddersRequest
} from '../../modules/OfferBidders/actions';
import {
  IOfferBidder,
  IOfferBiddersList,
  RequestPayload as OfferBiddersRequestPayload
} from '../../modules/OfferBidders/types';
import { IGeneralState } from '../../types';
import { chatGetConversationsRequest } from '../../modules/Chat/actions';

export interface IExternalProps {
  offer: IOfferDetails;
  offerBidders: IOfferBiddersList;
  isError: boolean;
  isRequesting: boolean;
  currentUser: ICurrentUser;
  complete: IGeneralState;
  setStatus: IGeneralState;
  bid: IGeneralState;
  report: IOfferReportState;
}

export interface IDispatchProps {
  offerRequest: typeof offerRequest;
  offerCompleteRequest: typeof offerCompleteRequest;
  offerSetStatusRequest: typeof offerSetStatusRequest;
  offerSelectBidder: typeof offerSelectBidder;
  offerBidRequest: typeof offerBidRequest;
  offerBidReset: typeof offerBidReset;
  offerBiddersRequest: typeof offerBiddersRequest;
  blockPeopleModalVisibilityChange: typeof blockPeopleModalVisibilityChange;
  offerFormUploadReset: typeof offerFormUploadReset;
  offerReport: typeof offerReport;
  offerSendMail: typeof offerSendMail;
}

export type Actions = OfferActions | BlockPeopleActions | FileUploadActions | OfferBiddersActions;

interface IMatchProps {
  offerId: string;
}

export interface IProps
  extends IExternalProps,
    IDispatchProps,
    IDispatchProps2,
    RouteComponentProps<IMatchProps> {}

export interface IPageProps extends IWithModalProps, IDispatchProps2 {
  offer: IOfferDetails;
  offerBidders: IOfferBiddersList;
  isRequesting: boolean;
  currentUserId: string;
  currentUserEmail: string;
  offerId: number;
  complete: IGeneralState;
  setStatus: IGeneralState;
  bid: IOfferBidState;
  report: IOfferReportState;
  offerCompleteRequest: (payload: OfferCompleteRequestPayload) => void;
  offerSetStatusRequest: (payload: OfferSetStatusRequestPayload) => void;
  offerSelectBidder: (payload: IOfferBidder) => void;
  offerBidRequest: (payload: OfferBidRequestPayload) => void;
  offerBidReset: () => void;
  offerBiddersRequest: (payload: OfferBiddersRequestPayload) => void;
  blockModalVisibilityChange: (payload: BlockPeopleModalVisibilityChangePayload) => void;
  offerReport: (payload: IOfferReportPayload) => void;
  offerSendMail: (payload: IOfferSendMailPayload) => void;
  user: any;
  history: H.History;
  isOfferAlreadyReported: boolean;
  offerRequest: (payload: IOfferRequestPayload) => void;
}

export interface IPageState {
  messageSent: boolean;
  successModalClose: boolean;
  reportModalOpen: boolean;
  reOpenModal: boolean;
  deleteOfferModal: boolean;
  alreadyReportModalOpen: boolean;
  tmpRequestFlag: boolean;
}

export interface IExternalProps2 {
  user: ICurrentUser;
}

export interface IDispatchProps2 {
  getConversationsRequest: typeof chatGetConversationsRequest;
}
