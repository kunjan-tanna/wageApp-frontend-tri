import {
  call,
  put,
  takeEvery
} from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';
import * as actions from './actions';
import { IOfferFormUploadRequest, OfferFormUploadRequestPayload, OfferFormUploadResponsePayload } from './types';


const fileUploadRequest = async (payload: OfferFormUploadRequestPayload): Promise<OfferFormUploadResponsePayload> => {

  const { file } = payload;
  const formData = new FormData();

  formData.append('file', file);


  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.fileUpload,
    formData,
    {
      baseURL: ApiConfig.URL,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );


  return data;
};

export function* fileUploadSaga(action: IOfferFormUploadRequest) {

  const { payload } = action;
  const { tempId } = payload;

  try {

    const response = yield call(fileUploadRequest, payload);

    yield put(actions.offerFormUploadSuccess({
      tempId,
      data: response.media[0]
    }));

  } catch (error) {

    yield put(actions.offerFormUploadError({ tempId }));
  }
}

export default function* () {
  yield takeEvery(actions.ActionTypes.OFFER_FILE_UPLOAD_REQUEST, fileUploadSaga);
}
