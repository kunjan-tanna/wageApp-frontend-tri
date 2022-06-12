import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import objectIsEmpty from '../../utils/ObjectIsEmpty';
import * as checkEmailActions from '../Modals/CheckEmail/actions';
import * as actions from './actions';
import { ISignUpRequest, RequestPayload, ResponsePayload } from './types';

const registerRequest = async (payload: RequestPayload): Promise<ResponsePayload> => {
  const { data } = await axios
    .create()
    .post<any>(ApiConfig.endpoints.account.account, payload.values, {
      baseURL: ApiConfig.URL
    });

  return data;
};

export function* signUpSaga(action: ISignUpRequest) {
  const { payload } = action;

  const {
    payload: {
      values,
      actions: { resetForm, setErrors, setStatus, setSubmitting }
    }
  } = action;

  try {
    const response: ResponsePayload = yield call(registerRequest, payload);

    yield put(actions.signUpSuccess(response));
    yield call(resetForm);
    yield call(setSubmitting, false);
    yield call(setStatus, {
      success: 'Sign up has been successed. Please check your e-mail for account confirmation.'
    });
    yield put(
      checkEmailActions.checkEmailModalOpen({
        userEmail: values.email
      })
    );
  } catch (error) {
    const { status, data } = error.response;
    const errors =
      status === 409
        ? {
            code: 409,
            status: 'Error:',
            fieldErrors: { email: 'This email is already registered' }
          }
        : status === 400
        ? data.validationMessages.email && data.validationMessages.email[0].length > 0
          ? {
              code: 409,
              status: 'Error:',
              fieldErrors: { email: data.validationMessages.email[0] }
            }
          : data.validationMessages.invalid_user &&
            data.validationMessages.invalid_user[0].length > 0
          ? {
              code: 409,
              status: 'Error:',
              fieldErrors: { email: data.validationMessages.invalid_user[0] }
            }
          : {
              code: 401,
              status: 'Unexpected error. Please try again.',
              fieldErrors: {}
              // @ToDo - DEPRECATED API RESPONSE: handleErrors(error, values)
            }
        : {
            code: 401,
            status: 'Unexpected error. Please try again.',
            fieldErrors: {}
            // @ToDo - DEPRECATED API RESPONSE: handleErrors(error, values)
          };

    yield put(actions.signUpError());
    yield call(setSubmitting, false);

    if (errors.status) {
      yield call(setStatus, {
        error: errors.status
      });
    }

    if (!objectIsEmpty(errors.fieldErrors)) {
      yield call(setErrors, errors.fieldErrors);
    }
  }
}

export default function*() {
  yield takeLatest(actions.ActionTypes.REQUEST, signUpSaga);
}
