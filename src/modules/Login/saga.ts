import { call, put, takeLatest } from 'redux-saga/effects';

import { authManager } from '../../utils/api/client';
import { currentUserRequest, currentUserSetDefaultValues } from '../CurrentUser/actions';

import { IWindow } from '../../types';
import * as checkEmailActions from '../Modals/CheckEmail/actions';
import * as loginActions from './actions';
import { ILoginExternalRequest, ILoginRequest } from './types';
import { detect } from 'detect-browser';

const loginRequest = async (login: string, password: string): Promise<any> => {
  return authManager.login(login, password);
};

const loginExternalRequest = async (
  accessToken: string,
  provider: string,
  Latitude: String,
  Longitude: String,
  loginDeviceType: string,
  zipCode: String
): Promise<any> => {
  console.log('6666666666666666666666666666666');
  return authManager.loginExternal(
    accessToken,
    provider,
    Latitude,
    Longitude,
    loginDeviceType,
    zipCode
  );
};

const logoutRequest = () => {
  console.log('\n\n 11111111111@@');
  (window as IWindow & typeof globalThis)?.FB?.getLoginStatus((response: any) => {
    if (response && response.status === 'connected') {
      (window as IWindow & typeof globalThis)?.FB?.logout();
    }
  });

  (window as IWindow & typeof globalThis)?.gapi?.auth2?.getAuthInstance()?.signOut();
  authManager.logout();
};

function* loginSaga(action: ILoginRequest) {
  const {
    payload: {
      values: { login, password },
      actions: { resetForm, setStatus, setSubmitting }
    }
  } = action;

  try {
    yield call(loginRequest, login, password);
    yield call(resetForm);
    yield call(setSubmitting, false);
    yield put(loginActions.loginSuccess());
    yield put(currentUserRequest());
  } catch (e) {
    const { data, status } = e.response;

    yield call(setSubmitting, false);

    if (data.hasOwnProperty('error_description')) {
      yield call(setStatus, {
        error: data.error_description
      });
      if (status === 403) {
        if (data.error === 'unauthorized_client') {
          yield put(
            checkEmailActions.checkEmailModalOpen({
              userEmail: login
            })
          );
        }
      }
    } else {
      yield call(setStatus, {
        error: 'Got internal error'
      });
    }

    yield put(loginActions.loginError());
  }
}

function* loginExternalSaga(action: ILoginExternalRequest) {
  const {
    payload: { accessToken, provider, Latitude, Longitude, loginDeviceType, zipCode }
  } = action;
  yield call(
    loginExternalRequest,
    accessToken,
    provider,
    Latitude,
    Longitude,
    loginDeviceType,
    zipCode
  );
  yield put(currentUserRequest());
}

function* logoutSaga() {
  yield call(logoutRequest);

  yield put(currentUserSetDefaultValues());
}

export default function*() {
  yield takeLatest(loginActions.ActionTypes.LOGIN_REQUEST, loginSaga);
  yield takeLatest(loginActions.ActionTypes.LOGIN_EXTERNAL_REQUEST, loginExternalSaga);
  yield takeLatest(loginActions.ActionTypes.LOGOUT_REQUEST, logoutSaga);
}
