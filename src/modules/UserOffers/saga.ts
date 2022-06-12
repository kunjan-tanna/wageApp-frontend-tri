import querystring from 'querystring';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { IStoreState } from '../../store';
import { apiClient } from '../../utils/api/client';

import * as userOffersActions from './actions';
import {
  IUserOffersCountRequest,
  IUserOffersRequest,
  OffersCountRequestPayload,
  RequestPayload,
  ResponsePayload,
  ResponsePayloadRaw
} from './types';

const getOffers = async (payload: RequestPayload): Promise<ResponsePayloadRaw> => {
  const { data } = await apiClient.get<any>(
    `${ApiConfig.endpoints.offers.getList}?${querystring.stringify(payload)}`,
    { baseURL: ApiConfig.URL }
  );

  return data;
};

const getOffersCount = async (
  userId: string,
  offerType: string
): Promise<OffersCountRequestPayload> => {
  const { data } = await apiClient.get<any>(
    `${ApiConfig.endpoints.offers.offersCount(userId, offerType)}`,
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* offerCountSaga(action: IUserOffersCountRequest) {
  const getToken = (state: IStoreState) => state.currentUser.currentUser.id;

  try {
    const userId = yield select(getToken);
    const offersCount = yield call(getOffersCount, userId, action.payload);
    yield put(
      userOffersActions.userOffersOffersCountSuccess({ offersCount, offerType: action.payload })
    );
  } catch (error) {
    yield put(
      userOffersActions.userOffersOffersCountSuccess({ offersCount: 0, offerType: action.payload })
    );
  }
}

export function* offerListSaga(action: IUserOffersRequest) {
  const { payload } = action;
  const { append, ...query } = payload;

  try {
    const response: ResponsePayload = {
      ...(yield call(getOffers, query)),
      page: payload.page,
      itemsPerPage: payload.itemsPerPage
    };
    if (append) {
      yield put(userOffersActions.userOffersAppendSuccess(response));
    } else {
      yield put(userOffersActions.userOffersSuccess(response));
    }
  } catch (error) {
    yield put(userOffersActions.userOffersError());
  }
}

export default function*() {
  yield takeLatest(userOffersActions.ActionTypes.USER_OFFERS_REQUEST, offerListSaga);
  yield takeLatest(userOffersActions.ActionTypes.USER_OFFERS_COUNT_REQUEST, offerCountSaga);
}
