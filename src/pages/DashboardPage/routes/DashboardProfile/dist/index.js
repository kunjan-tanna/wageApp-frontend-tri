'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
var react_1 = require('react');
var react_redux_1 = require('react-redux');
var redux_1 = require('redux');
var Loading_1 = require('../../../../components/Loading');
var actions_1 = require('../../../../modules/CurrentUser/actions');
var actions_2 = require('../../../../modules/FileUpload/actions');
var types_1 = require('../../../../types');
var DashboardItemHeader_1 = require('../../components/DashboardItemHeader');
var selectors_1 = require('../../../../modules/CurrentUser/selectors');
var CurrentUserDeleteAccount_1 = require('./components/CurrentUserDeleteAccount');
var CurrentUserPasswordData_1 = require('./components/CurrentUserPasswordData');
var CurrentUserPhoto_1 = require('./components/CurrentUserPhoto');
var CurrentUserProfileData_1 = require('./components/CurrentUserProfileData');
var CurrentUserVerify_1 = require('./components/CurrentUserVerify');
var selectors_2 = require('./selectors');
require('./styles.scss');
var MixPanel_1 = require('../../../../utils/MixPanel');
var DashboardProfile = /** @class */ (function(_super) {
  __extends(DashboardProfile, _super);
  function DashboardProfile() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this._onImageSelect = function(file) {
      _this.props.changeAvatarRequest({ file: file });
    };
    _this._handleDeleteAccount = function() {
      _this.props.deleteAccountRequest();
      MixPanel_1.mixPanelEvent('Account Deleted', {
        'Account deleted': true
      });
    };
    _this._handleChangePasswordSubmit = function(values, actions) {
      _this.props.changePasswordRequest({
        values: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        },
        actions: actions
      });
    };
    _this._handleChangePersonalDataSubmit = function(values, actions) {
      var accountType = _this.props.currentUser.accountType;
      var dataValues;
      if (accountType === types_1.AccountTypes.BUSINESS) {
        dataValues = values;
        _this.props.changePersonalDataRequest({
          values: {
            email: values.email,
            businessName: dataValues.businessName,
            businessAddressStreet: dataValues.businessAddressStreet,
            businessAddressCity: dataValues.businessAddressCity,
            businessPhoneNumber: dataValues.businessPhoneNumber,
            businessWebAddress: dataValues.businessWebAddress,
            zipCode: dataValues.zipCode
          },
          actions: actions
        });
      } else {
        dataValues = values;
        _this.props.changePersonalDataRequest({
          values: __assign({}, dataValues),
          actions: actions
        });
      }
    };
    return _this;
  }
  DashboardProfile.prototype.componentWillUnmount = function() {
    var _a = this.props,
      avatarUploadReset = _a.avatarUploadReset,
      currentUserFormDisplayReset = _a.currentUserFormDisplayReset;
    avatarUploadReset();
    currentUserFormDisplayReset();
  };
  DashboardProfile.prototype.componentDidMount = function() {
    var _a;
    var _b = this.props,
      currentUserRequest = _b.currentUserRequest,
      currentUserFormDisplayReset = _b.currentUserFormDisplayReset,
      currentUser = _b.currentUser;
    currentUserRequest();
    currentUserFormDisplayReset();
    //User profile event called here
    MixPanel_1.mixPanelEvent('User profile', {
      'Reported user': false,
      'Change password': false,
      'Change email': false,
      'Change phone number': false,
      'Change zipcode': false
    });
    MixPanel_1.setUserProfile(
      ((_a = {
        $email: currentUser.email,
        $phone: currentUser.phoneNumber,
        Zipcode: currentUser.zipCode,
        'Profile picture': currentUser.avatarUrl ? true : false
      }),
      (_a[currentUser.accountType == 'Business' ? 'Business account' : 'Personal account'] = true),
      _a)
    );
  };
  DashboardProfile.prototype.render = function() {
    var _a = this.props,
      currentUser = _a.currentUser,
      avatarUpload = _a.avatarUpload,
      deleteAccount = _a.deleteAccount,
      currentUserFormChangePasswordToggle = _a.currentUserFormChangePasswordToggle,
      currentUserChangePersonalDataToggle = _a.currentUserChangePersonalDataToggle,
      currentUserFormDeleteAccountToggle = _a.currentUserFormDeleteAccountToggle,
      changePasswordFormDisplay = _a.changePasswordFormDisplay,
      personalDataFormDisplay = _a.personalDataFormDisplay,
      deleteAccountConfirmDisplay = _a.deleteAccountConfirmDisplay,
      changePasswordSuccessDisplay = _a.changePasswordSuccessDisplay,
      currentUserRequesting = _a.currentUserRequesting;
    return react_1['default'].createElement(
      react_1['default'].Fragment,
      null,
      currentUserRequesting
        ? react_1['default'].createElement(Loading_1['default'], {
            isLoading: currentUserRequesting
          })
        : react_1['default'].createElement(
            react_1['default'].Fragment,
            null,
            currentUser.accountType === types_1.AccountTypes.BUSINESS &&
              react_1['default'].createElement(
                'div',
                { className: 'business-flag' },
                react_1['default'].createElement('i', { className: 'icon icon-business-flag' })
              ),
            react_1['default'].createElement(DashboardItemHeader_1['default'], {
              title: deleteAccountConfirmDisplay ? 'Delete Account' : 'My profile'
            }),
            react_1['default'].createElement(
              'div',
              { className: 'row profile' },
              react_1['default'].createElement(
                'div',
                { className: 'dashboard__page-content-block' },
                !deleteAccountConfirmDisplay &&
                  react_1['default'].createElement(
                    'div',
                    { className: 'profile__photo-verify row' },
                    react_1['default'].createElement(CurrentUserPhoto_1['default'], {
                      avatarError: avatarUpload.error,
                      avatarRequesting: avatarUpload.requesting,
                      avatarUrl: currentUser.avatarUrl,
                      onImageSelect: this._onImageSelect
                    }),
                    react_1['default'].createElement(CurrentUserVerify_1['default'], {
                      verifiedBy: currentUser.verifiedBy,
                      joinedDate: currentUser.joinedDate,
                      rating: currentUser.rating,
                      ratingCount: currentUser.ratingCount
                    })
                  ),
                react_1['default'].createElement(
                  'div',
                  { className: 'profile__data' },
                  !deleteAccountConfirmDisplay &&
                    react_1['default'].createElement(
                      react_1['default'].Fragment,
                      null,
                      react_1['default'].createElement(
                        'div',
                        { className: 'dashboard-card' },
                        react_1['default'].createElement(CurrentUserProfileData_1['default'], {
                          editMode: personalDataFormDisplay,
                          toggleEditMode: currentUserChangePersonalDataToggle,
                          currentUser: currentUser,
                          handleSubmit: this._handleChangePersonalDataSubmit
                        })
                      ),
                      react_1['default'].createElement(
                        'div',
                        { className: 'dashboard-card' },
                        react_1['default'].createElement(CurrentUserPasswordData_1['default'], {
                          changePasswordSuccessDisplay: changePasswordSuccessDisplay,
                          editMode: changePasswordFormDisplay,
                          toggleEditMode: currentUserFormChangePasswordToggle,
                          handleSubmit: this._handleChangePasswordSubmit
                        })
                      )
                    ),
                  react_1['default'].createElement(CurrentUserDeleteAccount_1['default'], {
                    deleteAccount: deleteAccount,
                    isDeleteConfirmation: deleteAccountConfirmDisplay,
                    toggleConfirmation: currentUserFormDeleteAccountToggle,
                    handleSubmit: this._handleDeleteAccount
                  })
                )
              )
            )
          )
    );
  };
  return DashboardProfile;
})(react_1.PureComponent);
var mapStateToProps = function(state) {
  return {
    currentUser: selectors_2.currentUserPersonalDataSelector(state.currentUser),
    avatarUpload: selectors_2.avatarUploadSelector(state),
    deleteAccount: selectors_2.deleteAccountSelector(state),
    changePasswordFormDisplay: selectors_2.changePasswordFormDisplaySelector(state),
    personalDataFormDisplay: selectors_2.personalDataFormDisplaySelector(state),
    deleteAccountConfirmDisplay: selectors_2.deleteAccountFormDisplaySelector(state),
    changePasswordSuccessDisplay: selectors_2.changePasswordSuccessDisplaySelector(state),
    currentUserRequesting: selectors_1.isRequestingSelector(state.currentUser)
  };
};
var mapDispatchToProps = function(dispatch) {
  return __assign(
    {},
    redux_1.bindActionCreators(
      {
        changePasswordRequest: actions_1.changePasswordRequest,
        changePersonalDataRequest: actions_1.changePersonalDataRequest,
        changeAvatarRequest: actions_1.changeAvatarRequest,
        deleteAccountRequest: actions_1.deleteAccountRequest,
        avatarUploadReset: actions_2.avatarUploadReset,
        currentUserRequest: actions_1.currentUserRequest,
        currentUserChangePersonalDataToggle: actions_1.currentUserChangePersonalDataToggle,
        currentUserFormChangePasswordToggle: actions_1.currentUserFormChangePasswordToggle,
        currentUserFormDeleteAccountToggle: actions_1.currentUserFormDeleteAccountToggle,
        currentUserFormDisplayReset: actions_1.currentUserFormDisplayReset
      },
      dispatch
    )
  );
};
exports['default'] = redux_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps))(
  DashboardProfile
);
