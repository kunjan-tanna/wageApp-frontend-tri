import querystring from 'querystring';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { OfferStatuses } from '../../types/offers';
import { apiClient } from '../../utils/api/client';

import * as offersActions from './actions';
import { IOffersRequest, RequestPayload, ResponsePayload, ResponsePayloadRaw } from './types';

const getOffers = async (payload: RequestPayload): Promise<ResponsePayloadRaw> => {
  const { data } = await apiClient.get<any>(
    `${ApiConfig.endpoints.offers.getList}?${querystring.stringify(payload)}`,
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* offerListSaga(action: IOffersRequest) {
  const { payload } = action;
  console.log('PAYLOAD====', payload);
  const { append, ...query } = payload;
  console.log('APPEND', append, query);

  try {
    const { offers, totalOffers } = yield call(getOffers, {
      ...query,
      type: query.offerType,
      status: query.status ? query.status : OfferStatuses.PENDING
    });
    const response: ResponsePayload = {
      totalOffers,
      offers: offers.map((offerItem: any) => {
        const { type, ...offer } = offerItem;
        return {
          ...offer,
          offerType: type
        };
      }),
      page: payload.page!,
      itemsPerPage: payload.itemsPerPage!
    };

    if (append) {
      yield put(offersActions.offersAppendSuccess(response));
    } else {
      yield put(offersActions.offersSuccess(response));
    }
  } catch (error) {
    yield put(offersActions.offersError());
  }
}

export default function*() {
  yield takeLatest(offersActions.ActionTypes.OFFERS_REQUEST, offerListSaga);
}
