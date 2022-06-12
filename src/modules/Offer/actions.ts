import {
  IOfferBidError,
  IOfferBidRequest,
  IOfferBidReset,
  IOfferBidSuccess,
  IOfferCompleteError,
  IOfferCompleteRequest,
  IOfferCompleteSuccess,
  IOfferError,
  IOfferReport,
  IOfferReportError,
  IOfferReportPayload,
  IOfferReportSuccess,
  IOfferRequest,
  IOfferSelectBidder,
  IOfferSendMail,
  IOfferSendMailError,
  IOfferSendMailPayload,
  IOfferSendMailSuccess,
  IOfferSetStatusError,
  IOfferSetStatusRequest,
  IOfferSetStatusSuccess,
  IOfferSuccess,
  OfferBidErrorPayload,
  OfferBidRequestPayload,
  OfferCompleteRequestPayload,
  OfferRequestPayload,
  OfferResponsePayload,
  OfferSetStatusRequestPayload,
  OfferSetStatusSuccessPayload  
} from './types';

import { IBlockPeopleModalBlockUserSuccess, IBlockPeopleModalUnblockUserSuccess } from '../Modals/BlockPeople/types';
import { IOfferBidder } from '../OfferBidders/types';

export enum ActionTypes {
  OFFER_REQUEST = '[OFFER] - request',
  OFFER_SUCCESS = '[OFFER] - success',
  OFFER_ERROR = '[OFFER] - error',
  OFFER_COMPLETE_REQUEST = '[OFFER] - complete - request',
  OFFER_COMPLETE_SUCCESS = '[OFFER] - complete - success',
  OFFER_COMPLETE_ERROR = '[OFFER] - complete - error',
  OFFER_SET_STATUS_REQUEST = '[OFFER] - set status - request',
  OFFER_SET_STATUS_SUCCESS = '[OFFER] - set status - success',
  OFFER_SET_STATUS_ERROR = '[OFFER] - set status - error',
  OFFER_BID_REQUEST = '[OFFER] - bid - request',
  OFFER_BID_SUCCESS = '[OFFER] - bid - success',
  OFFER_BID_ERROR = '[OFFER] - bid - error',
  OFFER_BID_RESET = '[OFFER] - bid - reset',
  OFFER_SELECT_BIDDER = '[OFFER] - select bidder',
  OFFER_REPORT = '[OFFER] - report',
  OFFER_REPORT_SUCCESS = '[OFFER] - report - success',
  OFFER_REPORT_ERROR = '[OFFER] - report - error',
  OFFER_SEND_MAIL = '[OFFER] - send mail',
  OFFER_SEND_MAIL_SUCCESS = '[OFFER] - send mail - success',
  OFFER_SEND_MAIL_ERROR = '[OFFER] - send mail - error',
}

export type Actions =
  | IOfferRequest
  | IOfferSuccess
  | IOfferError
  | IOfferCompleteRequest
  | IOfferCompleteSuccess
  | IOfferCompleteError
  | IOfferSetStatusRequest
  | IOfferSetStatusSuccess
  | IOfferSetStatusError
  | IOfferBidRequest
  | IOfferBidSuccess
  | IOfferBidError
  | IOfferBidReset
  | IBlockPeopleModalBlockUserSuccess
  | IBlockPeopleModalUnblockUserSuccess
  | IOfferSelectBidder
  | IOfferReport
  | IOfferReportSuccess
  | IOfferReportError
  | IOfferSendMail
  | IOfferSendMailSuccess
  | IOfferSendMailError;

export function offerRequest(payload: OfferRequestPayload): IOfferRequest {
  return {
    type: ActionTypes.OFFER_REQUEST,
    payload
  };
}

export function offerSuccess(payload: OfferResponsePayload): IOfferSuccess {
  return {
    type: ActionTypes.OFFER_SUCCESS,
    payload
  };
}

export function offerError(): IOfferError {
  return {
    type: ActionTypes.OFFER_ERROR
  };
}

export function offerCompleteRequest(payload: OfferCompleteRequestPayload): IOfferCompleteRequest {
  return {
    type: ActionTypes.OFFER_COMPLETE_REQUEST,
    payload
  };
}

export function offerCompleteSuccess(): IOfferCompleteSuccess {
  return {
    type: ActionTypes.OFFER_COMPLETE_SUCCESS
  };
}

export function offerCompleteError(): IOfferCompleteError {
  return {
    type: ActionTypes.OFFER_COMPLETE_ERROR
  };
}

export function offerSetStatusRequest(
  payload: OfferSetStatusRequestPayload
): IOfferSetStatusRequest {
  return {
    type: ActionTypes.OFFER_SET_STATUS_REQUEST,
    payload
  };
}

export function offerSetStatusSuccess(
  payload: OfferSetStatusSuccessPayload
): IOfferSetStatusSuccess {
  return {
    type: ActionTypes.OFFER_SET_STATUS_SUCCESS,
    payload
  };
}

export function offerSetStatusError(): IOfferSetStatusError {
  return {
    type: ActionTypes.OFFER_SET_STATUS_ERROR
  };
}

export function offerBidRequest(payload: OfferBidRequestPayload): IOfferBidRequest {
  return {
    type: ActionTypes.OFFER_BID_REQUEST,
    payload
  };
}

export function offerBidSuccess(payload: OfferBidRequestPayload): IOfferBidSuccess {
  return {
    type: ActionTypes.OFFER_BID_SUCCESS,
    payload
  };
}

export function offerBidReset(): IOfferBidReset {
  return {
    type: ActionTypes.OFFER_BID_RESET
  };
}

export function offerBidError(payload: OfferBidErrorPayload): IOfferBidError {
  return {
    type: ActionTypes.OFFER_BID_ERROR,
    payload
  };
}

export function offerSelectBidder(payload: IOfferBidder): IOfferSelectBidder {
  return {
    type: ActionTypes.OFFER_SELECT_BIDDER,
    payload
  }
}

export function offerReport(payload: IOfferReportPayload): IOfferReport {
  return {
    type: ActionTypes.OFFER_REPORT,
    payload
  }
}

export function offerReportSuccess(): IOfferReportSuccess {
  return {
    type: ActionTypes.OFFER_REPORT_SUCCESS
  }
}

export function offerReportError(): IOfferReportError {
  return {
    type: ActionTypes.OFFER_REPORT_ERROR
  }
}

export function offerSendMail(payload: IOfferSendMailPayload): IOfferSendMail {
  return {
    type: ActionTypes.OFFER_SEND_MAIL,
    payload
  }
}

export function offerSendMailSuccess(): IOfferSendMailSuccess {
  return {
    type: ActionTypes.OFFER_SEND_MAIL_SUCCESS
  }
}

export function offerSendMailError(): IOfferSendMailError {
  return {
    type: ActionTypes.OFFER_SEND_MAIL_ERROR
  }
}