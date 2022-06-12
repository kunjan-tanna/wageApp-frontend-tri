import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import Loading from '../../../../components/Loading';
import PhoneFormatter from '../../../../components/PhoneFormatter';

import {
  changeAvatarRequest,
  changePasswordRequest,
  changePersonalDataRequest,
  currentUserChangePersonalDataToggle,
  currentUserFormChangePasswordToggle,
  currentUserFormDeleteAccountToggle,
  currentUserFormDisplayReset,
  currentUserRequest,
  deleteAccountRequest
} from '../../../../modules/CurrentUser/actions';
import { avatarUploadReset } from '../../../../modules/FileUpload/actions';
import { IStoreState } from '../../../../store';
import { AccountTypes } from '../../../../types';
import DashboardItemHeader from '../../components/DashboardItemHeader';

import { isRequestingSelector } from '../../../../modules/CurrentUser/selectors';
import CurrentUserDeleteAccount from './components/CurrentUserDeleteAccount';
import CurrentUserPasswordData from './components/CurrentUserPasswordData';
import { IChangePasswordFormValues } from './components/CurrentUserPasswordData/types';
import CurrentUserPhoto from './components/CurrentUserPhoto';
import CurrentUserProfileData from './components/CurrentUserProfileData';
import {
  IChangeBusinessDataFormValues,
  IChangeInternalDataFormValues,
  IChangePersonalDataFormValues
} from './components/CurrentUserProfileData/types';
import CurrentUserVerify from './components/CurrentUserVerify';
import {
  avatarUploadSelector,
  changePasswordFormDisplaySelector,
  changePasswordSuccessDisplaySelector,
  currentUserPersonalDataSelector,
  deleteAccountFormDisplaySelector,
  deleteAccountSelector,
  personalDataFormDisplaySelector
} from './selectors';
import { Actions, IDispatchProps, IExternalProps, IProps, IChangeVal } from './types';

import './styles.scss';
import { mixPanelEvent, setUserProfile } from '../../../../utils/MixPanel';

import { logoutRequest } from '../../../../modules/Login/actions';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import PhoneInput from '../../../../components/PhoneInput';

import { apiClient, tokenStore } from '../../../../utils/api/client';
import { ApiConfig } from '../../../../config';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

class DashboardProfile extends PureComponent<IProps> {
  state = {
    open: false,
    phone: ''
  };
  public componentWillUnmount() {
    const { avatarUploadReset, currentUserFormDisplayReset } = this.props;

    avatarUploadReset();
    currentUserFormDisplayReset();
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  phoneNumModel = () => {
    const { currentUser } = this.props;
    return (
      <div>
        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <h2>Phone number is required</h2>
          <PhoneInput
            name="businessPhoneNumber"
            placeholder="Phone"
            iconName="phone"
            initialValue={currentUser.phoneNumber}
            onPhoneChange={(phoneNumber: string) => {
              this.setState({ phone: phoneNumber });
            }}
          />
          <div className="ConfirmBtn">
            <button
              className="btn btn--b btn--b-color"
              onClick={() => this._handleChangePhoneSubmit()}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    );
  };

  public componentDidMount(): void {
    const { currentUserRequest, currentUserFormDisplayReset, currentUser } = this.props;
    console.log('\n\n JJJJJJ', currentUser);
    currentUserRequest();
    currentUserFormDisplayReset();
    if (currentUser.phoneNumber == '' || currentUser.phoneNumber == null) {
      this.setState({ open: true });
    }

    //User profile event called here
    // mixPanelEvent('User profile', {
    //   'Reported user': false,
    //   'Change password': false,
    //   'Change email': false,
    //   'Change phone number': false,
    //   'Change zipcode': false
    // });

    setUserProfile({
      $email: currentUser.email,
      $phone: currentUser.phoneNumber,
      Zipcode: currentUser.zipCode,
      'Profile picture': currentUser.avatarUrl ? true : false,
      'Account Type': currentUser.accountType
      // [currentUser.accountType == 'Business' ? 'Business account' : 'Personal account']: true
    });
  }

  public render() {
    const {
      currentUser,
      avatarUpload,
      deleteAccount,
      currentUserFormChangePasswordToggle,
      currentUserChangePersonalDataToggle,
      currentUserFormDeleteAccountToggle,
      changePasswordFormDisplay,
      personalDataFormDisplay,
      deleteAccountConfirmDisplay,
      changePasswordSuccessDisplay,
      currentUserRequesting
    } = this.props;

    return (
      <div className="errrr">
        {currentUserRequesting ? (
          <Loading isLoading={currentUserRequesting} />
        ) : (
          <>
            {currentUser.accountType === AccountTypes.BUSINESS && (
              <div className="business-flag">
                <i className="icon icon-business-flag" />
              </div>
            )}
            <DashboardItemHeader
              title={deleteAccountConfirmDisplay ? 'Delete Account' : 'My profile'}
            />
            <div className="row profile">
              <div className="dashboard__page-content-block">
                {!deleteAccountConfirmDisplay && (
                  <div className="profile__photo-verify row">
                    <CurrentUserPhoto
                      avatarError={avatarUpload.error}
                      avatarRequesting={avatarUpload.requesting}
                      avatarUrl={currentUser.avatarUrl}
                      onImageSelect={this._onImageSelect}
                    />
                    <CurrentUserVerify
                      verifiedBy={currentUser.verifiedBy}
                      joinedDate={currentUser.joinedDate}
                      rating={currentUser.rating}
                      ratingCount={currentUser.ratingCount}
                    />
                  </div>
                )}
                <div className="profile__data">
                  {currentUser && (currentUser.phoneNumber == '' || currentUser.phoneNumber == null)
                    ? this.phoneNumModel()
                    : null}
                  {!deleteAccountConfirmDisplay && (
                    <>
                      <div className="dashboard-card">
                        <CurrentUserProfileData
                          editMode={personalDataFormDisplay}
                          toggleEditMode={currentUserChangePersonalDataToggle}
                          currentUser={currentUser}
                          handleSubmit={this._handleChangePersonalDataSubmit}
                        />
                      </div>
                      <div className="dashboard-card">
                        <CurrentUserPasswordData
                          changePasswordSuccessDisplay={changePasswordSuccessDisplay}
                          editMode={changePasswordFormDisplay}
                          toggleEditMode={currentUserFormChangePasswordToggle}
                          handleSubmit={this._handleChangePasswordSubmit}
                        />
                      </div>
                    </>
                  )}
                  <CurrentUserDeleteAccount
                    deleteAccount={deleteAccount}
                    isDeleteConfirmation={deleteAccountConfirmDisplay}
                    toggleConfirmation={currentUserFormDeleteAccountToggle}
                    handleSubmit={this._handleDeleteAccount}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  private _onImageSelect = (file: File): void => {
    this.props.changeAvatarRequest({ file });
  };

  private _handleDeleteAccount = (): void => {
    this.props.deleteAccountRequest();
    mixPanelEvent('Account Deleted', {
      'Account deleted': true
    });
  };

  private _handleChangePasswordSubmit = (values: IChangePasswordFormValues, actions: any): void => {
    this.props.changePasswordRequest({
      values: {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      },
      actions
    });
    mixPanelEvent('Updated user profile', { 'Change password': true });
  };

  private _handleChangePersonalDataSubmit = (
    values: IChangePersonalDataFormValues,
    actions: any
  ): void => {
    const accountType = this.props.currentUser.accountType;
    let dataValues;

    console.log(
      '\n XXXXXXXX',
      values.email,
      this.props.currentUser.email,
      '$$$$',
      this.props.personalDataFormDisplay
    );

    if (accountType === AccountTypes.BUSINESS) {
      dataValues = values as IChangeBusinessDataFormValues;
      var obj: IChangeVal = {};
      if (this.props.currentUser.businessName != dataValues.businessName) {
        obj['Change businessName'] = dataValues.businessName;
      }
      if (this.props.currentUser.businessAddressStreet != dataValues.businessAddressStreet) {
        obj['Change businessAddressStreet'] = dataValues.businessAddressStreet;
      }
      if (this.props.currentUser.businessAddressCity != dataValues.businessAddressCity) {
        obj['Change businessAddressCity'] = dataValues.businessAddressCity;
      }
      if (this.props.currentUser.businessWebAddress != dataValues.businessWebAddress) {
        obj['Change businessWebAddress'] = dataValues.businessWebAddress;
      }
      if (this.props.currentUser.email != dataValues.email) {
        obj['Change email'] = dataValues.email;
      }
      if (this.props.currentUser.businessPhoneNumber != dataValues.businessPhoneNumber) {
        obj['Change businessPhoneNumber'] = dataValues.businessPhoneNumber;
      }
      if (this.props.currentUser.zipCode != dataValues.zipCode) {
        obj['Change zip code'] = Number(dataValues.zipCode);
      }
      this.props.changePersonalDataRequest({
        values: {
          email: this.props.currentUser.email,
          businessName: dataValues.businessName,
          businessAddressStreet: dataValues.businessAddressStreet,
          businessAddressCity:
            dataValues.businessAddressCity || this.props.currentUser.businessAddressCity,
          businessPhoneNumber: dataValues.businessPhoneNumber,
          businessWebAddress: dataValues.businessWebAddress,
          zipCode: dataValues.zipCode,
          Latitude: dataValues.Latitude,
          Longitude: dataValues.Longitude
        },
        actions
      });
      mixPanelEvent('Updated user profile', obj);
    } else {
      dataValues = values as IChangeInternalDataFormValues;
      var obj: IChangeVal = {};
      console.log('\n\n\n JIK', dataValues);
      if (this.state.phone.length > 0) {
        dataValues.phoneNumber = this.state.phone;
      }
      if (this.props.currentUser.firstName != dataValues.firstName) {
        obj['Change name'] = dataValues.firstName + ' ' + dataValues.lastName;
      }
      if (this.props.currentUser.lastName != dataValues.lastName) {
        obj['Change name'] = dataValues.firstName + ' ' + dataValues.lastName;
      }
      if (this.props.currentUser.email != dataValues.email) {
        obj['Change email'] = dataValues.email;
      }
      if (this.props.currentUser.phoneNumber != dataValues.phoneNumber) {
        obj['Change phone number'] = dataValues.phoneNumber;
      }
      if (this.props.currentUser.zipCode != dataValues.zipCode) {
        obj['Change zip code'] = Number(dataValues.zipCode);
      }
      this.props.changePersonalDataRequest({
        values: {
          ...dataValues
        },
        actions
      });

      mixPanelEvent('Updated user profile', obj);
    }
  };

  _handleChangePhoneSubmit = async () => {
    console.log('\n\n JJKKKK');
    var obj: IChangeVal = {};
    const { currentUser } = this.props;
    let values = {
      email: currentUser.email,
      phoneNumber: this.state.phone,
      zipCode: currentUser.zipCode
    };
    const { data } = await apiClient.patch<any>(`https://api.wageapp.io/api/account`, values, {
      baseURL: ApiConfig.URL
    });
    obj['Change phone number'] = this.state.phone;
    mixPanelEvent('Updated user profile', obj);
    this.onCloseModal();
    await currentUserRequest();
    window.location.reload();
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    currentUser: currentUserPersonalDataSelector(state.currentUser),
    avatarUpload: avatarUploadSelector(state),
    deleteAccount: deleteAccountSelector(state),
    changePasswordFormDisplay: changePasswordFormDisplaySelector(state),
    personalDataFormDisplay: personalDataFormDisplaySelector(state),
    deleteAccountConfirmDisplay: deleteAccountFormDisplaySelector(state),
    changePasswordSuccessDisplay: changePasswordSuccessDisplaySelector(state),
    currentUserRequesting: isRequestingSelector(state.currentUser)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        changePasswordRequest,
        changePersonalDataRequest,
        changeAvatarRequest,
        deleteAccountRequest,
        avatarUploadReset,
        currentUserRequest,
        currentUserChangePersonalDataToggle,
        currentUserFormChangePasswordToggle,
        currentUserFormDeleteAccountToggle,
        currentUserFormDisplayReset
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(DashboardProfile);
