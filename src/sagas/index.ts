import { all } from 'redux-saga/effects';

import CategoriesSaga from '../modules/Categories/saga';
import ChatSaga from '../modules/Chat/saga';
import ContactFormSaga from '../modules/ContactForm/saga';
import CurrentUserSaga from '../modules/CurrentUser/saga';
import FileUploadSaga from '../modules/FileUpload/saga';
import ForgotPasswordSaga from '../modules/ForgotPassword/saga';
import LoginSaga from '../modules/Login/saga';
import ModalsSaga from '../modules/Modals/saga';
import MultiOfferSaga from '../modules/MultiuploadOffers/saga';
import NotificationsSaga from '../modules/Notifications/saga';
import OfferSaga from '../modules/Offer/saga';
import OfferBiddersSaga from '../modules/OfferBidders/saga';
import OfferFormSaga from '../modules/OfferForm/saga';
import OffersSaga from '../modules/Offers/saga';
import ResetPasswordSaga from '../modules/ResetPassword/saga';
import SignUpSaga from '../modules/SignUp/saga';
import StatesSaga from '../modules/States/saga';
import UserSaga from '../modules/User/saga';
import UserOffersSaga from '../modules/UserOffers/saga';

export default function* rootSaga() {
  yield all([
    LoginSaga(),
    OffersSaga(),
    OfferSaga(),
    UserSaga(),
    CategoriesSaga(),
    CurrentUserSaga(),
    SignUpSaga(),
    ContactFormSaga(),
    OfferBiddersSaga(),
    FileUploadSaga(),
    OfferFormSaga(),
    UserOffersSaga(),
    ForgotPasswordSaga(),
    ResetPasswordSaga(),
    ChatSaga(),
    ModalsSaga(),
    MultiOfferSaga(),
    StatesSaga(),
    NotificationsSaga()
  ]);
}
