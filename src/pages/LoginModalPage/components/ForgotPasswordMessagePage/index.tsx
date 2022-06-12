import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../../config';
import { IProps } from './types';

const ForgotPasswordMessagePage = (props: IProps) => {
  const { closeModal, email } = props;

  return (
    <div className="reset-password-message">
      <div className="modal-window__header">
        <h2>Reset password</h2>
        <Link to={Routes.HOME} className="modal-window__close" title="Close" />
      </div>
      <div className="modal-window__content">
        {/* <p>Email has been sent successfully.Email will be expired in 15 minutes.</p> */}
        <p>
          If there is an account associated with this email address, you will receive a reset
          password link in your inbox. The link will be good for 15 minutes.
        </p>
        {/* <p>
          If <strong>{email}</strong> is the email address for your Wage account,<br/>
          you will receive an email with instructions for resetting your password.<br/><br/>
        </p> */}
        <button className="btn btn--a" onClick={closeModal}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordMessagePage;
