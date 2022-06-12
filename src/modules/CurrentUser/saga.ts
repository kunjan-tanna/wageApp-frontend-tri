import Axios from 'axios';
import querystring from 'querystring';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';
import { handleErrors } from '../../utils/form';
import objectIsEmpty from '../../utils/ObjectIsEmpty';
import * as fileUpload from '../FileUpload/actions';
import * as loginActions from '../Login/actions';
import * as checkEmailActions from '../Modals/CheckEmail/actions';
import { ICheckEmailModalResend, ICheckEmailModalResendPayload } from '../Modals/CheckEmail/types';
import * as currentUserActions from './actions';
import {
  IConfirmationRequestData,
  ICurrentUserAccountConfirmationRequest,
  ICurrentUserChangeAvatarRequest,
  ICurrentUserChangePasswordPayload,
  ICurrentUserChangePasswordRequest,
  ICurrentUserChangePersonalDataRequest,
  ICurrentUserChangePersonalDataSuccessPayload,
  ICurrentUserChangePersonalDataValues,
  ICurrentUserEmailConfirmationRequest,
  ICurrentUserRevokeEmailRequest,
  ResponsePayload
} from './types';

const getCurrentUser = async (): Promise<ResponsePayload> => {
  const { data } = await apiClient.get<any>(ApiConfig.endpoints.currentUser.get, {
    baseURL: ApiConfig.URL
  });

  return data;
};

const getBlockedUsers = async (): Promise<ResponsePayload> => {
  const { data } = await apiClient.get<any>(ApiConfig.endpoints.users.getBlockedUsers, {
    baseURL: ApiConfig.URL
  });

  return data;
};

const changePasswordRequest = async (values: ICurrentUserChangePasswordPayload): Promise<any> => {
  return apiClient.post<any>(ApiConfig.endpoints.account.changePassword, values, {
    baseURL: ApiConfig.URL
  });
};

export function* currentUserSaga() {
  try {
    const response: ResponsePayload = yield call(getCurrentUser);

    yield put(currentUserActions.currentUserSuccess(response));
  } catch (error) {
    yield put(currentUserActions.currentUserError());
  }
}

export function* blockedUsersSaga() {
  try {
    const response = yield call(getBlockedUsers);

    yield put(currentUserActions.currentUserGetBlockedSuccess(response.blockedUsers));
  } catch (error) {
    yield put(currentUserActions.currentUserGetBlockedError());
  }
}

function* changePasswordSaga(action: ICurrentUserChangePasswordRequest) {
  const {
    payload: {
      values,
      actions: { resetForm, setStatus, setSubmitting }
    }
  } = action;
  try {
    yield call(changePasswordRequest, values);
    yield call(resetForm);
    yield call(setSubmitting, false);
    yield put(currentUserActions.currentUserFormChangePasswordToggle());
    yield put(currentUserActions.currentUserChangePasswordSuccessMessage());
    yield call(setStatus, {
      success: 'Your password has been changed'
    });
  } catch (e) {
    // 'Error ocurred during change password request, please try again'
    yield call(setSubmitting, false);
    yield call(setStatus, {
      error:
        e.response.data.validationMessages.password[0] ||
        e.response.data.validationMessages.identityResult[0]
    });
  }
}

const changePersonalDataRequest = async (
  values: ICurrentUserChangePersonalDataValues
): Promise<any> => {
  return apiClient.patch<any>(ApiConfig.endpoints.account.account, values, {
    baseURL: ApiConfig.URL
  });
};

function* changePersonalDataSaga(action: ICurrentUserChangePersonalDataRequest) {
  const {
    payload: {
      values,
      actions: { setStatus, setSubmitting, setErrors }
    }
  } = action;

  try {
    yield call(changePersonalDataRequest, values);
    yield call(setSubmitting, false);
    yield put(currentUserActions.currentUserChangePersonalDataToggle());
    yield call(setStatus, {
      success: 'Personal data has been changed'
    });
    const payloadSuccess: ICurrentUserChangePersonalDataSuccessPayload = {
      values: action.payload.values
    };

    yield put(currentUserActions.currentUserChangePersonalDataSuccess(payloadSuccess));
  } catch (e) {
    yield call(setSubmitting, false);

    const errors = handleErrors(e, values);

    yield call(setStatus, {
      error: errors.status
        ? errors.status
        : 'Error ocurred during change personal data, please try again'
    });

    if (!objectIsEmpty(errors.fieldErrors)) {
      yield call(setErrors, errors.fieldErrors);
    }
  }
}

const changeAvatarRequest = async (file: File): Promise<any> => {
  const formData = new FormData();

  formData.append('file', file);

  const { data } = await apiClient.post<any>(ApiConfig.endpoints.account.setAvatar, formData, {
    baseURL: ApiConfig.URL,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return data.url;
};

function* changeAvatarSaga(action: ICurrentUserChangeAvatarRequest) {
  const { payload } = action;
  try {
    yield put(fileUpload.avatarUploadRequest());
    const avatarUrl = yield call(changeAvatarRequest, payload.file);

    yield put(currentUserActions.currentUserChangeAvatarSuccess(avatarUrl));
    yield put(fileUpload.avatarUploadSuccess());
  } catch (e) {
    yield put(fileUpload.avatarUploadError());
  }
}

const deleteAccountRequest = async (): Promise<any> => {
  return apiClient.post<any>(ApiConfig.endpoints.account.deleteAccount, null, {
    baseURL: ApiConfig.URL
  });
};

function* deleteAccountSaga() {
  try {
    yield call(deleteAccountRequest);
    yield put(currentUserActions.deleteAccountSuccess());
    yield put(currentUserActions.currentUserSetDefaultValues());
  } catch (e) {
    yield put(currentUserActions.currentUserDeleteAccountError());
  }
}

const checkEmailModalResendRequest = async (data: ICheckEmailModalResendPayload): Promise<any> => {
  return Axios.post<any>(ApiConfig.endpoints.account.accountResendVerification, data, {
    baseURL: ApiConfig.URL
  });
};

function* checkEmailModalResendSaga(action: ICheckEmailModalResend) {
  const { payload } = action;

  try {
    yield call(checkEmailModalResendRequest, payload);
    yield put(checkEmailActions.checkEmailModalClose());
  } catch (e) {
    console.log('error');
  }
}

const accountConfirmationRequest = async (data: IConfirmationRequestData): Promise<any> => {
  return Axios.post<any>(ApiConfig.endpoints.account.accountConfirmation, data, {
    baseURL: ApiConfig.URL
  });
};

const emailConfirmationRequest = async (data: IConfirmationRequestData): Promise<any> => {
  return Axios.post<any>(ApiConfig.endpoints.account.emailConfirmation, data, {
    baseURL: ApiConfig.URL
  });
};

const revokeEmailChangeRequest = async (data: IConfirmationRequestData): Promise<any> => {
  return Axios.post<any>(ApiConfig.endpoints.account.revokeEmailChange, data, {
    baseURL: ApiConfig.URL
  });
};

function* confirmationSaga(
  action:
    | ICurrentUserAccountConfirmationRequest
    | ICurrentUserEmailConfirmationRequest
    | ICurrentUserRevokeEmailRequest
) {
  const {
    payload: { params }
  } = action;

  let request,
    success,
    error = null;

  const actions = currentUserActions.ActionTypes;
  switch (action.type) {
    case actions.CURRENT_USER_ACCOUNT_CONFIRMATION_REQUEST: {
      request = accountConfirmationRequest;
      success = currentUserActions.accountConfirmationSuccess();
      error = (msg: string) => currentUserActions.accountConfirmationError(msg);
      break;
    }
    case actions.CURRENT_USER_EMAIL_CONFIRMATION_REQUEST: {
      request = emailConfirmationRequest;
      success = currentUserActions.emailConfirmationSuccess();
      error = (msg: string) => currentUserActions.emailConfirmationError(msg);
      break;
    }
    case actions.CURRENT_USER_REVOKE_EMAIL_REQUEST: {
      request = revokeEmailChangeRequest;
      success = currentUserActions.revokeEmailSuccess();
      error = (msg: string) => currentUserActions.revokeEmailError(msg);
      break;
    }
  }

  const userData = querystring.parse(params);
  if (!userData.hasOwnProperty('token') || !userData.hasOwnProperty('userId')) {
    yield put(error('Confirmation link is not correct!'));
  } else {
    const { token, userId } = userData;

    try {
      yield put(loginActions.logoutRequest());
      yield call(request, {
        token: token.toString(),
        userId: userId.toString()
      });
      yield put(success);
    } catch (e) {
      yield put(
        error(
          e.response.status === 500
            ? 'Upss something went wrong. Please try again.'
            : 'Link is not correct, or already done!'
        )
      );
    }
  }
}

export default function*() {
  yield takeLatest(currentUserActions.ActionTypes.CURRENT_USER_REQUEST, currentUserSaga);
  yield takeLatest(
    currentUserActions.ActionTypes.CURRENT_USER_GET_BLOCKED_REQUEST,
    blockedUsersSaga
  );
  yield takeLatest(
    currentUserActions.ActionTypes.CURRENT_USER_CHANGE_PASSWORD_REQUEST,
    changePasswordSaga
  );
  yield takeLatest(
    currentUserActions.ActionTypes.CURRENT_USER_CHANGE_PERSONAL_DATA_REQUEST,
    changePersonalDataSaga
  );
  yield takeLatest(
    currentUserActions.ActionTypes.CURRENT_USER_DELETE_ACCOUNT_REQUEST,
    deleteAccountSaga
  );
  yield takeLatest(
    [
      currentUserActions.ActionTypes.CURRENT_USER_ACCOUNT_CONFIRMATION_REQUEST,
      currentUserActions.ActionTypes.CURRENT_USER_EMAIL_CONFIRMATION_REQUEST,
      currentUserActions.ActionTypes.CURRENT_USER_REVOKE_EMAIL_REQUEST
    ],
    confirmationSaga
  );
  yield takeLatest(
    currentUserActions.ActionTypes.CURRENT_USER_CHANGE_AVATAR_REQUEST,
    changeAvatarSaga
  );
  yield takeLatest(
    checkEmailActions.ActionTypes.CHECK_EMAIL_MODAL_RESEND,
    checkEmailModalResendSaga
  );
}
