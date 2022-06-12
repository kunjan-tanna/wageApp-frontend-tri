import React, { lazy, PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { Actions, IDispatchProps, IExternalProps, IProps } from './AppTypes';
import AuthorizedRoute from './components/AuthorizedRoute';
import BlockPeopleModal from './components/BlockPeopleModal';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import RouteLoader from './components/RouteLoader';
import ScrollToTop from './components/ScrollTop';
import SignalRConnector from './components/SignalRConnector';
import { Routes, RoutesArray } from './config';
import { chatGetConversationsRequest as getConversationsRequest } from './modules/Chat/actions';
import {
  accountConfirmationRequest,
  emailConfirmationRequest,
  revokeEmailRequest
} from './modules/CurrentUser/actions';
import { currentUserSelector } from './modules/CurrentUser/selectors';
import { blockPeopleModalVisibilitySelector } from './modules/Modals/BlockPeople/selectors';
import { getNotificationsRequest } from './modules/Notifications/actions';
import { statesRequest } from './modules/States/actions';
import { statesListSelector } from './modules/States/selectors';
import { setUserLocation } from './modules/UserPreferences/actions';
import { IMatch as IConfirmationMatch } from './pages/ConfirmationPage/types';
import { IStoreState } from './store';

const AddTaskPage = lazy(() => import('./pages/AddTaskPage'));
const Messages = lazy(() => import('./pages/DashboardPage/routes/DashboardMessages/index'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const EditTaskPage = lazy(() => import('./pages/EditTaskPage'));
const Error404Page = lazy(() => import('./pages/Error404Page'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginModalPage = lazy(() => import('./pages/LoginModalPage'));
const LogoutPage = lazy(() => import('./pages/LogoutPage'));
const OfferPage = lazy(() => import('./pages/OfferPage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const ResetPasswordModalPage = lazy(() => import('./pages/ResetPasswordModalPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const StaticContentPage = lazy(() => import('./pages/StaticContentPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const HelpMobile = lazy(() => import('./pages/StaticContentPage/routes/HelpCenterMobile/index'));
const DataDeletion = lazy(() => import('./pages/StaticContentPage/routes/DataDeletion/index'));

const modalsOnHomepage = [
  Routes.LOGIN,
  Routes.ACCOUNT_CONFIRMATION,
  Routes.EMAIL_CONFIRMATION,
  Routes.REVOKE_EMAIL,
  Routes.PASSWORD_RESET,
  Routes.SIGN_UP
];

class App extends PureComponent<IProps> {
  public componentDidMount(): void {
    const { currentUser, getConversationsRequest, getNotificationsRequest } = this.props;
    if (currentUser.email) {
      getConversationsRequest();
      getNotificationsRequest();
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { currentUser, getConversationsRequest, getNotificationsRequest } = this.props;

    if (prevProps.currentUser.email !== currentUser.email) {
      getConversationsRequest();
      getNotificationsRequest();
    }
  }

  public render() {
    const {
      currentUser,
      showBlockPeopleModal,
      statesList,
      statesRequest,
      setUserLocation
    } = this.props;

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          {/* {currentUser.email && <SignalRConnector />} */}
          <PageHeader setUserLocation={setUserLocation} />
          {/* {RoutesArray.includes(window.location.pathname) &&
            <PageHeader setUserLocation={setUserLocation} />} */}
          <Suspense fallback={<RouteLoader />}>
            <Switch>
              <Route path={[...modalsOnHomepage]} component={HomePage} exact={true} />
            </Switch>
          </Suspense>
          <Suspense fallback={<RouteLoader />}>
            <Switch>
              <Route path={Routes.HOME} component={HomePage} exact={true} />
              <Route path={Routes.LOGIN} component={LoginModalPage} />
              <Route path={Routes.PASSWORD_RESET} component={ResetPasswordModalPage} />
              <Route
                path={Routes.ACCOUNT_CONFIRMATION}
                render={(props: RouteComponentProps<IConfirmationMatch>) => (
                  <ConfirmationPage
                    {...props}
                    requestMethod={accountConfirmationRequest}
                    title="Account confirmation"
                    successMessage="Your account activation was successful!"
                  />
                )}
              />
              <Route
                path={Routes.EMAIL_CONFIRMATION}
                render={(props: RouteComponentProps<IConfirmationMatch>) => (
                  <ConfirmationPage
                    {...props}
                    requestMethod={emailConfirmationRequest}
                    title="E-mail change confirmation"
                    successMessage="Your e-mail was successfully changed!"
                  />
                )}
              />
              <Route
                path={Routes.REVOKE_EMAIL}
                render={(props: RouteComponentProps<IConfirmationMatch>) => (
                  <ConfirmationPage
                    {...props}
                    requestMethod={revokeEmailRequest}
                    title="Revoke e-mail change"
                    successMessage="Your original email address has been restored, current password has been invalidated and password reset link has been sent to your mailbox."
                  />
                )}
              />
              <Route path={Routes.SIGN_UP} component={SignUpPage} />
              {/* <Route path={Routes.OFFERS_LIST} component={OffersPage} /> */}
              <Route path={`${Routes.OFFER}/:offerId`} component={OfferPage} />
              <Route path={`${Routes.OFFER}/:offerId/create-online-store`} component={OfferPage} />
              <Route path={`${Routes.OFFER}`} component={OfferPage} />
              <Route path={`${Routes.USER_PROFILE}/:userId`} component={UserProfilePage} />
              <Route path={Routes.ABOUT} component={StaticContentPage} />
              <Route path={Routes.ABOUT_HELP_MOBILE} component={HelpMobile} />
              <Route path={Routes.DATA_DELETION} component={DataDeletion} />
              <Route path={Routes.LOGOUT} component={LogoutPage} />
              <AuthorizedRoute path={Routes.OFFERS_LIST} component={OffersPage} />

              <AuthorizedRoute path={Routes.ADD_TASK} component={AddTaskPage} />
              <AuthorizedRoute path={Routes.DASHBOARD_MESSAGES} component={Messages} />
              <AuthorizedRoute
                path={`${Routes.DASHBOARD_MESSAGES}/:conversationId`}
                component={Messages}
              />
              <AuthorizedRoute path={Routes.DASHBOARD} component={DashboardPage} />
              <AuthorizedRoute path={`${Routes.EDIT_TASK}/:offerId`} component={EditTaskPage} />
              <Route component={Error404Page} />
            </Switch>
          </Suspense>

          {/* {window.location.pathname !== Routes.DASHBOARD_MESSAGES  &&
       <PageFooter statesRequest={statesRequest} statesList={statesList} />} */}
          {/* {RoutesArray.includes(window.location.pathname) &&
            <PageFooter statesRequest={statesRequest} statesList={statesList} />} */}
          <PageFooter statesRequest={statesRequest} statesList={statesList} />
          {showBlockPeopleModal && <BlockPeopleModal />}
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    currentUser: currentUserSelector(state.currentUser),
    showBlockPeopleModal: blockPeopleModalVisibilitySelector(state.modals.BlockPeople),
    statesList: statesListSelector(state.states)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        getConversationsRequest,
        getNotificationsRequest,
        statesRequest,
        setUserLocation
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(App);
