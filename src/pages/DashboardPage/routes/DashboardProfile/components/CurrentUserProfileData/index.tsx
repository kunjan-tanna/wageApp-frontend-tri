import React, { PureComponent, ReactNode } from 'react';
import PhoneFormatter from '../../../../../../components/PhoneFormatter';

import { ICurrentUser } from '../../../../../../modules/CurrentUser/types';
import { AccountTypes } from '../../../../../../types';
import BusinessEditModal from './components/BusinessEditModal';
import InternalEditModal from './components/InternalEditModal';
import { IProps } from './types';

import './styles.scss';

class CurrentUserProfileData extends PureComponent<IProps> {
  public render() {
    const { currentUser, editMode, toggleEditMode } = this.props;

    console.log('Here', toggleEditMode);

    return (
      <>
        <div className="info-header">{this._renderInfoHeader(currentUser)}</div>
        <div className="row profile-data">
          {this._renderCurrentUserForm(currentUser, this.props)}
          {/* {!editMode && (
            <div className="data__navigation data__navigation--edit">
              <button className="btn btn--b" onClick={toggleEditMode}>
                Edit
              </button>
            </div>
          )} */}
        </div>
      </>
    );
  }

  private _renderInfoHeader = (currentUser: ICurrentUser): ReactNode => {
    const { editMode, toggleEditMode } = this.props;
    let name;
    if (currentUser.accountType === AccountTypes.BUSINESS) {
      name = currentUser.lastName;
    } else {
      name = currentUser.firstName + ' ' + currentUser.lastName;
    }
    console.log('\n\n IIIIII', name);
    if (name.length > 18) {
      return (
        <>
          {!editMode && (
            <div className="data__navigation data__navigation--edit">
              <button className="btn btn--b" onClick={toggleEditMode}>
                Edit
              </button>
            </div>
          )}
          <h3 className="user__name" title={name.toUpperCase()}>
            {currentUser.firstName}
          </h3>
          <h3 className="user__name" title={name.toUpperCase()}>
            {currentUser.lastName}
          </h3>
        </>
      );
    } else {
      return (
        <>
          {!editMode && (
            <div className="data__navigation data__navigation--edit">
              <button className="btn btn--b" onClick={toggleEditMode}>
                Edit
              </button>
            </div>
          )}
          <h2 className="userName">
            {' '}
            {currentUser.accountType === AccountTypes.BUSINESS
              ? currentUser.businessName
              : `${currentUser.firstName} ${currentUser.lastName}`}
          </h2>
        </>
      );
    }

    // <h2 className="userName">
    //   {' '}
    //   {currentUser.accountType === AccountTypes.BUSINESS
    //     ? currentUser.businessName
    //     : `${currentUser.firstName} ${currentUser.lastName}`}
    // </h2>
  };

  private _renderUserBusinessForm = (currentUser: ICurrentUser): ReactNode => {
    const {
      email,
      businessAddressStreet,
      businessAddressCity,
      businessPhoneNumber,
      businessWebAddress,
      zipCode
    } = currentUser;

    return (
      <div className="data__form data__form--business">
        <div className="input">
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--email" />
            </div>
            <p className="input__field">{email}</p>
            <span className="input__field-placeholder">Email</span>
          </div>
        </div>
        <div className="input">
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--address" />
            </div>
            <p className="input__field">{businessAddressStreet}</p>
            <span className="input__field-placeholder">Street</span>
          </div>
        </div>
        {/* <div className="input">
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--city" />
            </div>
            <p className="input__field">{businessAddressCity}</p>
            <span className="input__field-placeholder">City</span>
          </div>
        </div> */}
        <div className="input">
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--city" />
            </div>
            <p className="input__field">{zipCode}</p>
            <span className="input__field-placeholder">Zip code</span>
          </div>
        </div>
        <div className="input">
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--phone" />
            </div>
            <p className="input__field">
              <PhoneFormatter value={businessPhoneNumber} />
            </p>
            <span className="input__field-placeholder">Phone</span>
          </div>
        </div>

        <div className="input">
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--computer" />
            </div>
            <p className="input__field">{businessWebAddress}</p>
            <span className="input__field-placeholder">Website</span>
          </div>
        </div>
      </div>
    );
  };

  private _renderUserInternalForm = (currentUser: ICurrentUser): ReactNode => {
    const { email, zipCode, phoneNumber } = currentUser;

    return (
      <div className="data__form">
        <div className="input">
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--email" />
            </div>
            <p className="input__field">{email}</p>
            <span className="input__field-placeholder">Email</span>
          </div>
        </div>
        {phoneNumber && (
          <div className="input__field-wrapper">
            <div className="input__icon">
              <i className="icon icon--phone" />
            </div>
            <p className="input__field">
              <PhoneFormatter value={phoneNumber} />
            </p>
            <span className="input__field-placeholder">Phone</span>
          </div>
        )}

        <div className="input__field-wrapper">
          <div className="input__icon">
            <i className="icon icon--city" />
          </div>
          <p className="input__field">{zipCode}</p>
          <span className="input__field-placeholder">Zip code</span>
        </div>
      </div>
    );
  };

  private _renderCurrentUserForm = (currentUser: ICurrentUser, props: IProps): ReactNode => {
    const { handleSubmit, editMode, toggleEditMode } = props;

    return this.props.currentUser.accountType === AccountTypes.BUSINESS ? (
      <>
        {this._renderUserBusinessForm(currentUser)}
        <BusinessEditModal
          isOpen={editMode}
          currentUser={currentUser}
          closeModal={toggleEditMode}
          handleSubmit={handleSubmit}
        />
      </>
    ) : (
      <>
        {this._renderUserInternalForm(currentUser)}
        <InternalEditModal
          isOpen={editMode}
          currentUser={currentUser}
          handleSubmit={handleSubmit}
          closeModal={toggleEditMode}
        />
      </>
    );
  };
}

export default CurrentUserProfileData;
