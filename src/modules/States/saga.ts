import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';

import * as statesActions from './actions';
import { ResponsePayload } from './types';

const getStates = async (): Promise<ResponsePayload> => {
  const { data } = await apiClient.get<any>(
    ApiConfig.endpoints.offers.getStates,
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* statesListSaga() {
  try {
    const response: ResponsePayload = yield call(getStates);
    yield put(statesActions.statesSuccess(response));
  } catch (error) {
    yield put(statesActions.statesError());
  }
}

export default function* () {
  yield takeLatest(statesActions.ActionTypes.STATES_REQUEST, statesListSaga);
}
