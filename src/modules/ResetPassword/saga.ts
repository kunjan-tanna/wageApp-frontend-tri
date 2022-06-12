import Axios from 'axios';
import {
  call,
  takeLatest
} from 'redux-saga/effects';

import { ApiConfig } from '../../config';

import * as resetPasswordActions from './actions';
import { IResetPasswordRequest } from './types';

const resetPasswordRequest = async (values: any): Promise<any> => {
  return Axios.post<any>(
    ApiConfig.endpoints.account.resetPassword,
    values,
    {
      baseURL: ApiConfig.URL
    }
  );
};

function* resetPasswordSaga(action: IResetPasswordRequest) {
  const {
    payload: {
      values,
      actions: {
        resetForm, setStatus, setSubmitting, setModalSuccessState
      }
    }
  } = action;

  try {
    yield call(resetPasswordRequest, values);
    yield call(resetForm);
    yield call(setSubmitting, false);
    yield call(setModalSuccessState);
  } catch (e) {
    yield call(setSubmitting, false);
    yield call(setStatus, {
      error: 'Link has expired or email address doesn\'t exist'
    });
  }
}

export default function* () {
  yield takeLatest(resetPasswordActions.ActionTypes.RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
