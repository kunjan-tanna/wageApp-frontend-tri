import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthorizationBySocialMedia from '../../../../components/AuthorizationBySocialMedia';
import logo from '../../../../../src/styles/images/logo-dark.svg';
import { Routes } from '../../../../config';
import LoginForm from './form';
import { IPageProps } from './types';

import './styles.scss';
import { Logout } from '../../../../utils/MixPanel';

class LoginPage extends Component<IPageProps> {
  componentDidMount = () => {
    localStorage.removeItem('loginType');
    Logout();
  };

  public render() {
    const { handleSubmit, handleForgotPassword, history } = this.props;

    const data = {
      facebook: {
        text: 'Facebook'
      },
      google: {
        text: 'Google'
      }
    };

    return (
      <div className="login auth-content">
        <div className="authLeft">
          <Link to="./" className="logo">
            <img src={logo} className="" alt="Wage" />
          </Link>
          <p className="get-job">Get the job done</p>
        </div>
        <div className="authRight">
          <div className="modal-window__header">
            <h2>Sign In</h2>
            <Link to={Routes.HOME} className="modal-window__close" title="Close" />
          </div>
          <div className="modal-window__content">
            <LoginForm handleSubmit={handleSubmit} handleForgotPassword={handleForgotPassword} />
            <AuthorizationBySocialMedia
              history={history}
              title="or log in with"
              google={data.google}
              facebook={data.facebook}
            />
            <div className="modal-window__sign-up">
              <p>
                Don’t have an account? <Link to={Routes.SIGN_UP}>Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
