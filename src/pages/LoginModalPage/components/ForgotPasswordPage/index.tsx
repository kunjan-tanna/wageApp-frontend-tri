import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../../config';
import ForgotPasswordForm from './form';
import { IPageProps } from './types';

import './styles.scss';

class ForgotPasswordPage extends Component<IPageProps> {
  public render() {
    const {
      handleSubmit,
      goBack
    } = this.props;

    return (
      <div className="reset-password">
        <div className="modal-window__header">
          <button className="modal-window__go-back" onClick={goBack} title="Go back"/>
          <h2>Reset password</h2>
          <Link to={Routes.HOME} className="modal-window__close" title="Close"/>
        </div>
        <div className="modal-window__content">
          <div className="modal-window__content__text-before">
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>
          <ForgotPasswordForm handleSubmit={handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordPage;