import classnames from 'classnames';
import React, { PureComponent, ReactNode } from 'react';

import Loading from '../../../../../../components/Loading';

import { IProps } from './types';

import './styles.scss';

class CurrentUserDeleteAccount extends PureComponent<IProps> {

  public render() {
    const { isDeleteConfirmation } = this.props;

    return (
      <div className="row delete-account">
        {isDeleteConfirmation
          ? this._renderDeleteAccountConfirmation()
          : this._renderInfoDeleteAccount()
        }
      </div>
    );
  }

  private _renderInfoDeleteAccount = (): ReactNode => (
    <div className="delete-account__content">
      Don't want to be on Wage anymore?
      <button className="delete-btn" onClick={this.props.toggleConfirmation}>Delete account</button>
    </div>
  );

  private _renderDeleteAccountConfirmation = (): ReactNode => {

    const { deleteAccount, handleSubmit, toggleConfirmation } = this.props;

    const containerClassNames = classnames(
      'delete-account__confirmation',
      { 'loading': deleteAccount.requesting }
    );

    return (
      <div className={`${containerClassNames} dashboard-card`}>
        {deleteAccount.requesting && <Loading/>}
        <h3>Are you sure you want to delete your account? You won't be able to get it back.</h3>
        {deleteAccount.error &&
        <div className="error-info">
          Error ocurred during account deletion. Please try again.
        </div>
        }
        <div className="navigation">
          <button className="btn btn--b" onClick={handleSubmit}>
            Yes, delete it
          </button>
          <button className="btn btn--b btn--b-keep" onClick={toggleConfirmation}>
            No, keep my account
          </button>
        </div>
      </div>
    );
  };
}

export default CurrentUserDeleteAccount;
