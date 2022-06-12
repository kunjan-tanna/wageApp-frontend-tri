import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';

import * as offersActions from './actions';
import { ResponsePayload } from './types';

const getCategories = async (): Promise<ResponsePayload> => {
  const { data } = await apiClient.get<any>(
    ApiConfig.endpoints.offers.getCategories,
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* categoryListSaga() {
  try {
    const response: ResponsePayload = yield call(getCategories);

    yield put(offersActions.categoriesSuccess(response));
  } catch (error) {
    yield put(offersActions.categoriesError());
  }
}

export default function* () {
  yield takeLatest(offersActions.ActionTypes.CATEGORIES_REQUEST, categoryListSaga);
}
