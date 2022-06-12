import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators, compose, Dispatch } from 'redux';

import CheckEmailModal from '../../components/CheckEmailModal';
import withModal from '../../components/Modal';
import { Routes } from '../../config';
import { isAuthorizedSelector } from '../../modules/CurrentUser/selectors';
import { forgotPasswordRequest } from '../../modules/ForgotPassword/actions';
import { loginRequest } from '../../modules/Login/actions';
import { IStoreState } from '../../store';
import ForgotPasswordMessagePage from './components/ForgotPasswordMessagePage';

import { checkEmailSelector } from '../../modules/Modals/CheckEmail/selectors';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import { IFormValues as IForgotPasswordFormValues } from './components/ForgotPasswordPage/types';
import LoginPage from './components/LoginPage';
import { IFormValues as ILoginFormValues } from './components/LoginPage/types';
import { Actions, IDispatchProps, IExternalProps, IProps, IState } from './types';
import { identity, mixPanelEvent, setUserProfile } from '../../utils/MixPanel/index';
import moment from 'moment';
import mt from 'moment-timezone';
// import mixpanel from 'mixpanel-browser'
class LoginModalPageContainer extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      forgotPasswordEmail: ''
    };
  }

  public render() {
    console.log('\n\n\n @@@@@@@@@@@@@@@@@@@@@ login model');
    const { success, getModalVisibility, location, checkEmail, userData } = this.props;

    const { visible, userEmail } = checkEmail;

    const isOpen = getModalVisibility('Login');
    console.log('\n\n WWWWW', isOpen, success);
    if (!isOpen || success) {
      console.log('\n\n *****-->', this.props.userData, moment().format('DD/MM/YYYY'));

      // --------------------------------------------------------------------------------
      console.log(userData.currentUser.email);
      identity(userData.currentUser.email);

      let a = localStorage.getItem('loginType');

      mixPanelEvent('Login', {
        'Log in method': `${a || 'email'}`,
        'Log in date': mt(new Date())
          .tz('America/Galapagos')
          .format('MM/DD/YYYY')
      });

      // --------------------------------------------------------------------------------

      const to =
        location.state && location.state.hasOwnProperty('from') ? location.state.from : Routes.HOME;
      console.log('TOO is', to);
      if (to.includes('/offer') && location.state.var != 'report') {
        window.localStorage.setItem('re_flag', 'true');
      }
      return <Redirect to={to} />;
    }

    return (
      <>
        {!visible && (
          <ReactModal
            isOpen={getModalVisibility('Login')}
            className="modal-window-wrapper auth-modal"
          >
            <div className="modal-window">{this._renderContent()}</div>
          </ReactModal>
        )}
        <CheckEmailModal email={userEmail} modalVisibility={visible} />
      </>
    );
  }

  private _renderContent = () => {
    const { setModalState, getModalState, closeModal, history } = this.props;

    const { forgotPasswordEmail } = this.state;

    switch (getModalState('Login')) {
      case 'forgot-password':
        return (
          <ForgotPasswordPage
            handleSubmit={this._handleForgotPassword}
            goBack={setModalState('Login', 'login')}
          />
        );
      case 'forgot-password-message':
        return (
          <ForgotPasswordMessagePage closeModal={closeModal('Login')} email={forgotPasswordEmail} />
        );
      default:
        return (
          <LoginPage
            history={history}
            handleSubmit={this._handleLogin}
            handleForgotPassword={setModalState('Login', 'forgot-password')}
          />
        );
    }
  };

  private _handleLogin = (values: ILoginFormValues, actions: any) => {
    const { loginRequest } = this.props;
    loginRequest({ values, actions });
  };

  private _handleForgotPassword = (values: IForgotPasswordFormValues, actions: any) => {
    const { forgotPasswordRequest, setModalState } = this.props;

    forgotPasswordRequest({
      values,
      actions: {
        ...actions,
        setModalSuccessState: setModalState('Login', 'forgot-password-message')
      }
    });

    return this.setState({
      forgotPasswordEmail: values.email
    });
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        loginRequest,
        forgotPasswordRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    success: isAuthorizedSelector(state.currentUser),
    checkEmail: checkEmailSelector(state),
    userData: state.currentUser
  };
};

const LoginModalPage = compose<any>(connect(mapStateToProps, mapDispatchToProps))(
  LoginModalPageContainer
);

export default withModal(LoginModalPage, [
  {
    name: 'Login',
    state: 'login',
    visible: true
  }
]);
