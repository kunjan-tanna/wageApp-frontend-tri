import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';

import * as actions from './actions';
import { IContactFormRequest, RequestPayload, ResponsePayload } from './types';


const sendMessageRequest = async (payload: RequestPayload): Promise<ResponsePayload> => {

  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.contactForm,
    payload.values,
    {
      baseURL: ApiConfig.URL
    }
  );

  return data;
};

export function* contactFormSaga(action: IContactFormRequest) {

  const { payload } = action;

  const {
    payload: {
      actions: {
        resetForm,
        setStatus,
        setSubmitting
      },
    },
  } = action;

  try {
    const response: ResponsePayload = yield call(sendMessageRequest, payload);

    yield put(actions.contactFormSuccess(response));

    yield call(resetForm);
    yield call(setSubmitting, false);
    yield call(setStatus, {
      success: 'Message has been sent.'
    })

  } catch (error) {

    const {status} = error.response;

    yield put(actions.contactFormError());
    yield call(setSubmitting, false);
    yield call(setStatus, {
      error: status === 400 ? 'Validation error.' : 'Unexpected error. Please try again.'
    })
  }
}

export default function* () {
  yield takeLatest(actions.ActionTypes.REQUEST, contactFormSaga);
}
