import downloadFile from 'downloadjs';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';
import * as multiOfferActions from '../MultiuploadOffers/actions';
import { IMultiOfferPayload, IMultiOfferRequest } from './types';

const extendRequestPayload = (payload: IMultiOfferPayload) => {
  return {
    ...payload.values,
    media: payload.values.media.split(',').map((id: string) => ({ id: parseInt(id, 10) })),
    offers: [
      ...payload.values.offers.map(offer => ({
        ...offer,
        price: offer.price ? offer.price : null,
        description: offer.description ? offer.description : ''
      }))
    ]
  };
};

const multiOfferRequest = async (payload: IMultiOfferPayload): Promise<{}> => {
  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.multiOffers.createMultiOffers,
    extendRequestPayload(payload),
    {
      baseURL: ApiConfig.URL
    }
  );

  return data;
};

export function* multiOfferSaga(action: IMultiOfferRequest) {
  const { payload } = action;

  const {
    payload: {
      actions: { setSubmitting }
    }
  } = action;

  try {
    yield call(multiOfferRequest, payload);
    yield put(multiOfferActions.multiOfferRequestSuccess());
    yield call(setSubmitting, false);
  } catch (error) {
    const errorMsg =
      error?.response?.status === 400
        ? 'You have incomplete address information.'
        : 'Upss something went wrong. Please try again.';
    yield put(multiOfferActions.multiOfferRequestError(errorMsg));
  }
}

const getMultiOfferTemplate = async (): Promise<any> => {
  const { data } = await apiClient.get<any>(ApiConfig.endpoints.multiOffers.excelTemplate, {
    baseURL: ApiConfig.URL,
    responseType: 'blob'
  });

  return data;
};

export function* multiOfferTemplateSaga() {
  try {
    const response: Blob = yield call(getMultiOfferTemplate);
    yield downloadFile(response, 'multi_offer_upload_template.csv', 'text/csv');
    yield put(multiOfferActions.multiOfferTemplateRequestSuccess(response));
  } catch (error) {
    yield put(multiOfferActions.multiOfferTemplateRequestError());
  }
}

export default function*() {
  yield takeLatest(multiOfferActions.ActionTypes.MULTI_OFFER_REQUEST, multiOfferSaga);
  yield takeLatest(
    multiOfferActions.ActionTypes.MULTI_OFFER_TEMPLATE_REQUEST,
    multiOfferTemplateSaga
  );
}
