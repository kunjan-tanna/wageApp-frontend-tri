import React, { useCallback, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Routes } from '../../config';
import {
  checkEmailModalResend,
  checkEmailModalResetValues
} from '../../modules/Modals/CheckEmail/actions';
import { IProps } from './types';

import './styles.scss';

const CheckEmailModal = (props: IProps) => {
  const { modalVisibility, email } = props;

  const dispatch = useDispatch();

  const resendEmail = useCallback(
    email =>
      dispatch(
        checkEmailModalResend({
          userEmail: email
        })
      ),
    [dispatch]
  );

  const resetModal = useCallback(() => dispatch(checkEmailModalResetValues()), [dispatch]);

  useEffect(() => {
    resetModal();
  }, [resetModal]);

  return (
    <ReactModal isOpen={modalVisibility} className="modal-window-wrapper">
      <div className="modal-window check-email">
        <div className="modal-window__header">
          <h2>Check your email!</h2>
          <Link
            to={Routes.HOME}
            onClick={resetModal}
            className="modal-window__close"
            title="Close"
          />
        </div>
        <div className="modal-window__content">
          <p>Please confirm your email address before continuing.</p>
          <p>
            We sent an account activation link to your email address: <strong>{email}</strong>
          </p>
          <Link className="btn btn--b btn--b-color" to={Routes.LOGIN}>
            Log in again
          </Link>
          <div className="resend__title">
            <h4 className="resend__title__head">Didn't get the email?</h4>
          </div>
          <div className="resend__link">
            <button onClick={() => resendEmail(email)}>Resend the email message</button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default CheckEmailModal;
