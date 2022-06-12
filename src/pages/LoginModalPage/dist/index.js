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
var react_modal_1 = require('react-modal');
var react_redux_1 = require('react-redux');
var react_router_1 = require('react-router');
var redux_1 = require('redux');
var CheckEmailModal_1 = require('../../components/CheckEmailModal');
var Modal_1 = require('../../components/Modal');
var config_1 = require('../../config');
var selectors_1 = require('../../modules/CurrentUser/selectors');
var actions_1 = require('../../modules/ForgotPassword/actions');
var actions_2 = require('../../modules/Login/actions');
var ForgotPasswordMessagePage_1 = require('./components/ForgotPasswordMessagePage');
var selectors_2 = require('../../modules/Modals/CheckEmail/selectors');
var ForgotPasswordPage_1 = require('./components/ForgotPasswordPage');
var LoginPage_1 = require('./components/LoginPage');
var index_1 = require('../../utils/MixPanel/index');
var moment_1 = require('moment');
var moment_timezone_1 = require('moment-timezone');
// import mixpanel from 'mixpanel-browser'
var LoginModalPageContainer = /** @class */ (function(_super) {
  __extends(LoginModalPageContainer, _super);
  function LoginModalPageContainer(props) {
    var _this = _super.call(this, props) || this;
    _this._renderContent = function() {
      var _a = _this.props,
        setModalState = _a.setModalState,
        getModalState = _a.getModalState,
        closeModal = _a.closeModal,
        history = _a.history;
      var forgotPasswordEmail = _this.state.forgotPasswordEmail;
      switch (getModalState('Login')) {
        case 'forgot-password':
          return react_1['default'].createElement(ForgotPasswordPage_1['default'], {
            handleSubmit: _this._handleForgotPassword,
            goBack: setModalState('Login', 'login')
          });
        case 'forgot-password-message':
          return react_1['default'].createElement(ForgotPasswordMessagePage_1['default'], {
            closeModal: closeModal('Login'),
            email: forgotPasswordEmail
          });
        default:
          return react_1['default'].createElement(LoginPage_1['default'], {
            history: history,
            handleSubmit: _this._handleLogin,
            handleForgotPassword: setModalState('Login', 'forgot-password')
          });
      }
    };
    _this._handleLogin = function(values, actions) {
      var loginRequest = _this.props.loginRequest;
      loginRequest({ values: values, actions: actions });
    };
    _this._handleForgotPassword = function(values, actions) {
      var _a = _this.props,
        forgotPasswordRequest = _a.forgotPasswordRequest,
        setModalState = _a.setModalState;
      forgotPasswordRequest({
        values: values,
        actions: __assign(__assign({}, actions), {
          setModalSuccessState: setModalState('Login', 'forgot-password-message')
        })
      });
      return _this.setState({
        forgotPasswordEmail: values.email
      });
    };
    _this.state = {
      forgotPasswordEmail: ''
    };
    return _this;
  }
  LoginModalPageContainer.prototype.render = function() {
    console.log('\n\n\n @@@@@@@@@@@@@@@@@@@@@ login model');
    var _a = this.props,
      success = _a.success,
      getModalVisibility = _a.getModalVisibility,
      location = _a.location,
      checkEmail = _a.checkEmail,
      userData = _a.userData;
    var visible = checkEmail.visible,
      userEmail = checkEmail.userEmail;
    var isOpen = getModalVisibility('Login');
    console.log('\n\n WWWWW', isOpen, success);
    if (!isOpen || success) {
      console.log('\n\n *****-->', this.props.userData, moment_1['default']().format('DD/MM/YYYY'));
      // --------------------------------------------------------------------------------
      console.log(userData.currentUser.email);
      index_1.identity(userData.currentUser.email);
      var a = localStorage.getItem('loginType');
      index_1.mixPanelEvent('Login', {
        'Log in method': '' + (a || 'email'),
        'Log in date': moment_timezone_1['default'](new Date())
          .tz('America/Galapagos')
          .format('MM/DD/YYYY')
      });
      // --------------------------------------------------------------------------------
      var to =
        location.state && location.state.hasOwnProperty('from')
          ? location.state.from
          : config_1.Routes.HOME;
      console.log('TOO is', to);
      if (to.includes('/offer') && location.state['var'] != 'report') {
        window.localStorage.setItem('re_flag', 'true');
      }
      return react_1['default'].createElement(react_router_1.Redirect, { to: to });
    }
    return react_1['default'].createElement(
      react_1['default'].Fragment,
      null,
      !visible &&
        react_1['default'].createElement(
          react_modal_1['default'],
          { isOpen: getModalVisibility('Login'), className: 'modal-window-wrapper' },
          react_1['default'].createElement(
            'div',
            { className: 'modal-window' },
            this._renderContent()
          )
        ),
      react_1['default'].createElement(CheckEmailModal_1['default'], {
        email: userEmail,
        modalVisibility: visible
      })
    );
  };
  return LoginModalPageContainer;
})(react_1.Component);
var mapDispatchToProps = function(dispatch) {
  return __assign(
    {},
    redux_1.bindActionCreators(
      {
        loginRequest: actions_2.loginRequest,
        forgotPasswordRequest: actions_1.forgotPasswordRequest
      },
      dispatch
    )
  );
};
var mapStateToProps = function(state) {
  return {
    success: selectors_1.isAuthorizedSelector(state.currentUser),
    checkEmail: selectors_2.checkEmailSelector(state),
    userData: state.currentUser
  };
};
var LoginModalPage = redux_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps))(
  LoginModalPageContainer
);
exports['default'] = Modal_1['default'](LoginModalPage, [
  {
    name: 'Login',
    state: 'login',
    visible: true
  }
]);
