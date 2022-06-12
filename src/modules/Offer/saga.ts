import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient, tokenStore } from '../../utils/api/client';
import { getUser } from '../User/saga';
import { ResponsePayload as UserResponsePayload } from '../User/types';

import * as offerActions from './actions';
import {
  offerReportError,
  offerReportSuccess,
  offerSendMailError,
  offerSendMailSuccess
} from './actions';
import {
  IOfferBidRequest,
  IOfferCompleteRequest,
  IOfferReport,
  IOfferReportPayload,
  IOfferRequest,
  IOfferSendMail,
  IOfferSendMailPayload,
  IOfferSetStatusRequest,
  OfferBidRequestPayload,
  OfferBidResponsePayload,
  OfferCompleteRequestPayload,
  OfferCompleteResponsePayload,
  OfferGetOwnerEmailResponse,
  OfferReportResponsePayload,
  OfferRequestPayload,
  OfferResponsePayload,
  OfferSetStatusRequestPayload,
  OfferSetStatusResponsePayload
} from './types';

const getOffer = async (payload: OfferRequestPayload): Promise<OfferResponsePayload> => {
  const { offerId } = payload;

  const { data } = await apiClient.get<any>(ApiConfig.endpoints.offers.getDetails(offerId), {
    baseURL: ApiConfig.URL
  });

  return data;
};

const offerComplete = async (
  payload: OfferCompleteRequestPayload
): Promise<OfferCompleteResponsePayload> => {
  const { bidderId, rating, reason, offerId } = payload;

  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.offers.complete(`${offerId}`),
    { bidderId, rating, reason },
    { baseURL: ApiConfig.URL }
  );

  return data;
};

const offerSetStatus = async (
  payload: OfferSetStatusRequestPayload
): Promise<OfferSetStatusResponsePayload> => {
  const { offerId, status, workerId } = payload;

  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.offers.setStatus(`${offerId}`),
    { status, workerId },
    { baseURL: ApiConfig.URL }
  );

  return data;
};

const offerBid = async (payload: OfferBidRequestPayload): Promise<OfferBidResponsePayload> => {
  const { offerId, message } = payload;

  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.offers.bid(`${offerId}`),
    { message },
    { baseURL: ApiConfig.URL }
  );

  return data;
};

const offerReport = async (payload: IOfferReportPayload): Promise<OfferReportResponsePayload> => {
  const { offerId } = payload;
  const Authorization = tokenStore.get().access_token;

  await apiClient.post<any>(
    ApiConfig.endpoints.offers.report(`${offerId}`),
    { offerId, Authorization },
    { baseURL: ApiConfig.URL }
  );
};

const offerGetOwnerEmail = async (
  payload: IOfferSendMailPayload
): Promise<OfferGetOwnerEmailResponse> => {
  const { offerId } = payload;

  const { data } = await apiClient.get<any>(
    ApiConfig.endpoints.offers.getOwnerEmail(`${offerId}`),
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* offerSaga(action: IOfferRequest) {
  const { payload } = action;

  try {
    const { type, ...response } = yield call(getOffer, payload);
    const {
      id,
      verifiedBy,
      rating,
      ratingCount,
      lastName,
      firstName,
      avatarUrl,
      accountType,
      isBlocked,
      communicationBlocked,
      joinedDate,
      businessName
    }: UserResponsePayload = yield call(getUser, { userId: response.owner.id });

    yield put(
      offerActions.offerSuccess({
        ...response,
        offerType: type,
        ownerUserDetails: {
          id: id!,
          verifiedBy: verifiedBy!,
          rating: rating!,
          ratingCount: ratingCount!,
          lastName: lastName!,
          firstName: firstName!,
          avatarUrl: avatarUrl!,
          accountType: accountType!,
          isBlocked: isBlocked!,
          communicationBlocked: communicationBlocked!,
          joinedDate: joinedDate!,
          businessName: businessName!
        }
      })
    );
  } catch (error) {
    yield put(offerActions.offerError());
  }
}

export function* offerCompleteSaga(action: IOfferCompleteRequest) {
  const { payload } = action;

  try {
    yield call(offerComplete, payload);

    yield put(offerActions.offerCompleteSuccess());
  } catch (error) {
    yield put(offerActions.offerCompleteError());
  }
}

export function* offerSetStatusSaga(action: IOfferSetStatusRequest) {
  const { payload } = action;
  try {
    yield call(offerSetStatus, payload);

    yield put(
      offerActions.offerSetStatusSuccess({
        status: payload.status
      })
    );
  } catch (error) {
    yield put(offerActions.offerSetStatusError());
  }
}

export function* offerBidSaga(action: IOfferBidRequest) {
  const { payload } = action;
  try {
    yield call(offerBid, payload);
    yield put(offerActions.offerBidSuccess(payload));
  } catch (error) {
    yield put(
      offerActions.offerBidError({
        responseStatus: error.response && error.response.status ? error.response.status : 500
      })
    );
  }
}

export function* offerReportSaga(action: IOfferReport) {
  const { payload } = action;

  try {
    yield call(offerReport, payload);
    yield put(offerReportSuccess());
  } catch (error) {
    yield put(offerReportError());
  }
}

export function* offerSendMailSaga(action: IOfferSendMail) {
  const { payload } = action;

  try {
    const { userEmail } = yield call(offerGetOwnerEmail, payload);
    yield call(() => (window.location.href = `mailto:${userEmail}`));
    yield put(offerSendMailSuccess());
  } catch (error) {
    yield put(offerSendMailError());
  }
}

export default function*() {
  yield takeLatest(offerActions.ActionTypes.OFFER_REQUEST, offerSaga);
  yield takeLatest(offerActions.ActionTypes.OFFER_COMPLETE_REQUEST, offerCompleteSaga);
  yield takeLatest(offerActions.ActionTypes.OFFER_SET_STATUS_REQUEST, offerSetStatusSaga);
  yield takeLatest(offerActions.ActionTypes.OFFER_BID_REQUEST, offerBidSaga);
  yield takeLatest(offerActions.ActionTypes.OFFER_REPORT, offerReportSaga);
  yield takeLatest(offerActions.ActionTypes.OFFER_SEND_MAIL, offerSendMailSaga);
}
