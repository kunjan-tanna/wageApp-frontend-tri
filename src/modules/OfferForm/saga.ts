import moment from 'moment';
import mt from 'moment-timezone';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ApiConfig } from '../../config';
import { apiClient } from '../../utils/api/client';
import { mixPanelEvent } from '../../utils/MixPanel';
import * as fileUploadActions from '../FileUpload/actions';
import * as offerModalActions from '../Modals/OfferModify/actions';
import * as offerFormActions from './actions';
import {
  EditFormRequestPayload,
  IAddTaskRequest,
  IEditTaskRequest,
  OfferFormRequestPayload
} from './types';

import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs');
Geocode.setLanguage('en');
Geocode.setRegion('us');
Geocode.enableDebug();

const extendRequestPayload = (payload: OfferFormRequestPayload) => {
  return {
    ...payload.values,
    price: payload.values.price ? payload.values.price : null,
    media: payload.values.media.split(',').map((id: string) => ({ id: parseInt(id, 10) }))
  };
};

const addTaskRequest = async (payload: OfferFormRequestPayload): Promise<{}> => {
  const { data } = await apiClient.post<any>(
    ApiConfig.endpoints.offers.add,
    extendRequestPayload(payload),
    {
      baseURL: ApiConfig.URL
    }
  );

  return data;
};

export function* addTaskSaga(action: IAddTaskRequest) {
  const { payload } = action;

  const {
    payload: {
      actions: { resetForm, setSubmitting }
    }
  } = action;

  try {
    yield put(offerModalActions.offerModifyModalOpen());
    yield call(addTaskRequest, payload);
    yield put(offerFormActions.addTaskSuccess());

    let images = payload.values.media.split(',');
    let type = payload.values.type[0].toUpperCase() + payload.values.type.slice(1);

    Geocode.fromLatLng(String(payload.values.lat), String(payload.values.lng)).then((res: any) => {
      let zipcode;
      if (res.status == 'OK') {
        let result = res.results[0];
        if (result) {
          for (var i = 0; i < result.address_components.length; i++) {
            var types = result.address_components[i].types;

            for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
              if (types[typeIdx] == 'postal_code') {
                zipcode = result.address_components[i].short_name;
              }
            }
          }
        } else {
          console.log('No results found');
        }
      }

      // Add Task event clled here
      let categories, category_name;
      let a = localStorage.getItem('offer_categories');

      if (a && JSON.parse(a) && JSON.parse(a)[0]) {
        categories = JSON.parse(a);

        let b = categories.filter((obj: any) => {
          return obj.value == payload.values.categoryId;
        });

        category_name = b[0].label;
      }

      mixPanelEvent(`${type} added`, {
        Title: payload.values.title,
        Images: images.length,
        Price: payload.values.price,
        'Date created': mt(new Date())
          .tz('America/Galapagos')
          .format('MM/DD/YYYY'),
        Category: category_name || '',
        Location: zipcode
      });
    });

    yield call(resetForm);
    yield call(setSubmitting, false);
    yield put(
      offerModalActions.offerModifyModalShowMessage({ message: 'Task successfully created.' })
    );
    yield put(fileUploadActions.offerFormUploadReset());
  } catch (error) {
    yield put(offerFormActions.addTaskError());
    yield call(setSubmitting, false);
    yield put(
      offerModalActions.offerModifyModalShowMessage({
        message: 'Internal error. Please try again.'
      })
    );
  }
}

const editTaskRequest = async (payload: EditFormRequestPayload): Promise<{}> => {
  const { data } = await apiClient.put<any>(
    ApiConfig.endpoints.offers.edit(payload.offerId),
    extendRequestPayload(payload),
    {
      baseURL: ApiConfig.URL
    }
  );

  return data;
};

export function* editTaskSaga(action: IEditTaskRequest) {
  const { payload } = action;

  const {
    payload: {
      actions: { resetForm, setSubmitting }
    }
  } = action;

  try {
    yield put(offerModalActions.offerModifyModalOpen());
    yield call(editTaskRequest, payload);
    yield put(offerFormActions.editTaskSuccess());

    yield call(resetForm);
    yield call(setSubmitting, false);
    yield put(
      offerModalActions.offerModifyModalShowMessage({ message: 'Task successfully edited.' })
    );
    yield put(fileUploadActions.offerFormUploadReset());
  } catch (error) {
    yield put(offerFormActions.editTaskError());
    yield call(setSubmitting, false);
    yield put(
      offerModalActions.offerModifyModalShowMessage({
        message: 'Internal error. Please try again.'
      })
    );
  }
}

export default function*() {
  yield takeLatest(offerFormActions.ActionTypes.ADD_TASK_REQUEST, addTaskSaga);
  yield takeLatest(offerFormActions.ActionTypes.EDIT_TASK_REQUEST, editTaskSaga);
}
