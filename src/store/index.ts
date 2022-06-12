import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';

import { IOffersStoreState } from '../modules/Offers/types';
import offersReducer from '../modules/Offers/reducers';

import { IOfferStoreState } from '../modules/Offer/types';
import offerReducer from '../modules/Offer/reducers';

import { IUserStoreState } from '../modules/User/types';
import userReducer from '../modules/User/reducers';

import { ICategoriesStoreState } from '../modules/Categories/types';
import categoriesReducer from '../modules/Categories/reducers';

import { ICurrentUserStoreState } from '../modules/CurrentUser/types';
import currentUserReducer from '../modules/CurrentUser/reducers';

import { IContactFormStoreState } from '../modules/ContactForm/types';
import contactFormReducer from '../modules/ContactForm/reducers';

import { IOfferBiddersStoreState } from '../modules/OfferBidders/types';
import offerBiddersReducer from '../modules/OfferBidders/reducers';

import { IFileUploadStoreState } from '../modules/FileUpload/types';
import fileUploadReducer from '../modules/FileUpload/reducers';

import { IMapScriptState } from '../modules/MapScript/types';
import mapScriptReducer from '../modules/MapScript/reducers';

import { IMultiOffersState } from '../modules/MultiuploadOffers/types';
import multiUploadOffersReducer from '../modules/MultiuploadOffers/reducers';

import { IUserOffersStoreState } from '../modules/UserOffers/types';
import userOffersReducer from '../modules/UserOffers/reducers';

import { IChatStoreState } from '../modules/Chat/types';
import chatReducer from '../modules/Chat/reducers';

import { IModalsState } from '../modules/Modals/types';
import modalsReducer from '../modules/Modals/reducers';

import { INotificationsStoreState } from '../modules/Notifications/types';
import notificationsReducer from '../modules/Notifications/reducers';

import { IStatesState } from '../modules/States/types';
import statesReducer from '../modules/States/reducers';

import { IUserPreferencesState } from '../modules/UserPreferences/types';
import userPreferencesReducer from '../modules/UserPreferences/reducers';

export interface IStoreState {
  offers: IOffersStoreState;
  offer: IOfferStoreState;
  user: IUserStoreState;
  categories: ICategoriesStoreState;
  currentUser: ICurrentUserStoreState;
  contactForm: IContactFormStoreState;
  offerBidders: IOfferBiddersStoreState;
  fileUpload: IFileUploadStoreState;
  multiUploadOffers: IMultiOffersState;
  mapScript: IMapScriptState;
  userOffers: IUserOffersStoreState;
  chat: IChatStoreState;
  modals: IModalsState;
  notifications: INotificationsStoreState;
  states: IStatesState;
  userPreferences: IUserPreferencesState;
}

const rootReducer = combineReducers<IStoreState>({
  offers: offersReducer,
  offer: offerReducer,
  user: userReducer,
  categories: categoriesReducer,
  currentUser: currentUserReducer,
  contactForm: contactFormReducer,
  offerBidders: offerBiddersReducer,
  fileUpload: fileUploadReducer,
  mapScript: mapScriptReducer,
  userOffers: userOffersReducer,
  chat: chatReducer,
  modals: modalsReducer,
  notifications: notificationsReducer,
  multiUploadOffers: multiUploadOffersReducer,
  states: statesReducer,
  userPreferences: userPreferencesReducer
});

export default configureStore(rootReducer, rootSaga);
