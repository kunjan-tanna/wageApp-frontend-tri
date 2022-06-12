import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';

import * as offerBiddersActions from './actions';
import { IOfferBiddersRequest, RequestPayload, ResponsePayload } from './types';

const getOfferBidders = async (payload: RequestPayload): Promise<ResponsePayload> => {
  const { offerId } = payload;

  const { data } = await apiClient.get<any>(
    ApiConfig.endpoints.offers.getBidders(offerId),
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* offerBiddersSaga(action: IOfferBiddersRequest) {
  const { payload } = action;

  try {
    const response: ResponsePayload = yield call(getOfferBidders, payload);

    yield put(offerBiddersActions.offerBiddersSuccess(response));
  } catch (error) {
    yield put(offerBiddersActions.offerBiddersError());
  }
}

export default function* () {
  yield takeLatest(offerBiddersActions.ActionTypes.OFFER_BIDDERS_REQUEST, offerBiddersSaga);
}
