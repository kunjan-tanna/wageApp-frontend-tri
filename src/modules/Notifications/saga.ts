import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';
import * as actions from './actions';
import {
  GetNotificationsResponsePayload,
  INotificationsMarkAsRead,
  INotificationsRemove
} from './types';


const getNotificationsRequest = async (): Promise<GetNotificationsResponsePayload> => {

  const { data } = await apiClient.get<any>(
    ApiConfig.endpoints.notifications.getAll,
    { baseURL: ApiConfig.URL }
  );

  return data;
};


export function* getNotificationsSaga() {

  try {

    const response: GetNotificationsResponsePayload = yield call(getNotificationsRequest);

    yield put(actions.getNotificationsSuccess(response));

  } catch (error) {

    yield put(actions.getNotificationsError());
  }
}

export function* markNotificationAsReadSaga(action: INotificationsMarkAsRead) {

  try {
    yield apiClient.post<any>(
      ApiConfig.endpoints.notifications.markNotificationAsRead(action.payload),
      null,
      { baseURL: ApiConfig.URL }
    );

    yield put(actions.markNotificationAsReadSuccess(action.payload));
  } catch (error) {
    yield put(actions.markNotificationAsReadError(action.payload));
  }
}

export function* removeNotificationSaga(action: INotificationsRemove) {

  try {
    yield apiClient.post<any>(
      ApiConfig.endpoints.notifications.deleteNotification(action.payload),
      null,
      { baseURL: ApiConfig.URL }
    );

    yield put(actions.removeNotificationSuccess(action.payload));
  } catch (error) {
    yield put(actions.removeNotificationError(action.payload));
  }
}

export default function* () {
  yield takeLatest(actions.ActionTypes.NOTIFICATIONS_GET_ALL_REQUEST, getNotificationsSaga);
  yield takeLatest(actions.ActionTypes.NOTIFICATIONS_MARK_NOTIFICATION_AS_READ, markNotificationAsReadSaga);
  yield takeLatest(actions.ActionTypes.NOTIFICATIONS_REMOVE_NOTIFICATION, removeNotificationSaga);
}
