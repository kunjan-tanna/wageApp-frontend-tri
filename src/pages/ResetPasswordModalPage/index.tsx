import React, { Component, Fragment } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { bindActionCreators, compose, Dispatch } from 'redux';

import withModal from '../../components/Modal';
import { Routes } from '../../config';
import { resetPasswordRequest } from '../../modules/ResetPassword/actions';
import getSearchParamsAsObject from '../../utils/GetSearchParamsAsObject';
import ResetPasswordForm from './components/ResetPasswordForm';
import { IFormValues } from './components/ResetPasswordForm/types';
import { IDispatchProps, IProps } from './types';

class ResetPasswordModalPageContainer extends Component<IProps> {
  public render() {
    const { getModalVisibility, closeModal } = this.props;

    const isOpen = getModalVisibility('ResetPassword');

    if (!isOpen) {
      return <Redirect to={Routes.HOME} />;
    }

    return (
      <ReactModal isOpen={getModalVisibility('ResetPassword')} className="modal-window-wrapper">
        <div className="modal-window">
          <div className="modal-window__header">
            <h2>Setting new password</h2>
            <button
              className="modal-window__close"
              title="Close"
              onClick={closeModal('ResetPassword')}
            >
              <span>Close</span>
            </button>
          </div>
          <div className="modal-window__content">{this._renderContent()}</div>
        </div>
      </ReactModal>
    );
  }

  private _renderContent = () => {
    const { getModalState, history } = this.props;

    switch (getModalState('ResetPassword')) {
      case 'success':
        return (
          <Fragment>
            <p>Your password has been changed succesfully!</p>
            <br />
            <button className="btn btn--b btn--b-color" onClick={() => history.push(Routes.LOGIN)}>
              Login
            </button>
          </Fragment>
        );
      default:
        return <ResetPasswordForm handleSubmit={this._handleResetPassword} />;
    }
  };

  private _handleResetPassword = (values: IFormValues, actions: any) => {
    const {
      setModalState,
      resetPasswordRequest,
      location: { search }
    } = this.props;

    const queryParams = getSearchParamsAsObject(search);

    if (!queryParams.hasOwnProperty('code') || !queryParams.hasOwnProperty('userEmail')) {
      return actions.setStatus({
        error: 'Reset password link is not correct.'
      });
    }

    resetPasswordRequest({
      values: {
        email: queryParams.userEmail.toString(),
        token: queryParams.code.toString(),
        newPassword: values.password
      },
      actions: {
        ...actions,
        setModalSuccessState: setModalState('ResetPassword', 'success')
      }
    });
  };
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        resetPasswordRequest
      },
      dispatch
    )
  };
};

const ResetPasswordModalPage = compose<any>(connect(null, mapDispatchToProps))(
  ResetPasswordModalPageContainer
);

export default withRouter(
  withModal(ResetPasswordModalPage, [
    {
      name: 'ResetPassword',
      state: 'form',
      visible: true
    }
  ])
);
