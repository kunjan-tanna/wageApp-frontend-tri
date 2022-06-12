import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';

import * as actions from './actions';
import { IGetUserRequest, RequestPayload, ResponsePayload } from './types';


export const getUser = async (payload: RequestPayload): Promise<ResponsePayload> => {

  const { userId } = payload;

  const { data } = await apiClient.get<any>(
    ApiConfig.endpoints.users.getUser(userId),
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* userSaga(action: IGetUserRequest) {
  const { payload } = action;

  try {
    const response: ResponsePayload = yield call(getUser, payload);

    yield put(actions.getUserSuccess(response));
  } catch (error) {
    yield put(actions.getUserError());
  }
}

export default function* () {
  yield takeLatest(actions.ActionTypes.GET_USER_REQUEST, userSaga);
}
