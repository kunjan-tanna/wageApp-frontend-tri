import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';

import { ApiConfig } from '../../../config';
import { apiClient } from '../../../utils/api/client';

import * as actions from './actions';
import {
  IBlockingUserResponsePayload,
  IBlockPeopleModalBlockUserRequest,
  IBlockPeopleModalUnblockUserRequest
} from './types';

const unblockUser = async (payload: IBlockingUserResponsePayload): Promise<any> => {
  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.users.unblockUser(payload.userId),
    null,
    { baseURL: ApiConfig.URL }
  );

  return data;
};

const blockUser = async (payload: IBlockingUserResponsePayload): Promise<any> => {
  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.users.blockUser(payload.userId),
    null,
    { baseURL: ApiConfig.URL }
  );

  return data;
};

export function* blockUserSaga(action: IBlockPeopleModalBlockUserRequest) {

  const { payload } = action;

  try {
    const response = yield call(blockUser, payload);

    yield put(actions.blockUserSuccess(response));
  } catch (error) {
    yield put(actions.blockUserError());
  }
}

export function* unblockUserSaga(action: IBlockPeopleModalUnblockUserRequest) {

  const { payload } = action;

  try {
    const response = yield call(unblockUser, payload);

    yield put(actions.unblockUserSuccess(response));
  } catch (error) {
    yield put(actions.unblockUserError());
  }
}

export default function* () {
  yield takeLatest(actions.ActionTypes.BLOCK_PEOPLE_MODAL_BLOCK_USER_REQUEST, blockUserSaga);
  yield takeLatest(actions.ActionTypes.BLOCK_PEOPLE_MODAL_UNBLOCK_USER_REQUEST, unblockUserSaga);
}
