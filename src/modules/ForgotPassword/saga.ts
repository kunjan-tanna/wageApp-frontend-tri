import Axios from 'axios';
import {
  call,
  takeLatest,
} from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { IFormValues } from '../../pages/LoginModalPage/components/ForgotPasswordPage/types';

import * as forgotPasswordActions from './actions';
import { IForgotPasswordRequest } from './types';

const forgotPasswordRequest = async (values: IFormValues): Promise<any> => {
  return Axios.post<any>(
    ApiConfig.endpoints.account.forgotPassword,
    values,
    {
      baseURL: ApiConfig.URL
    }
  );
}

function* forgotPasswordSaga(action: IForgotPasswordRequest) {
  const {
    payload: {
      values,
      actions: {
        resetForm, setStatus, setSubmitting, setModalSuccessState,
      },
    },
  } = action;

  try {
    
    yield call(forgotPasswordRequest, values);
    yield call(resetForm);
    yield call(setSubmitting, false);
    yield call(setModalSuccessState);

  } catch (e) {

    yield call(setSubmitting, false);
    yield call(setStatus, {
      error: 'Make sure email address is correct'
    });
  }
}

export default function* () {
  yield takeLatest(forgotPasswordActions.ActionTypes.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}
