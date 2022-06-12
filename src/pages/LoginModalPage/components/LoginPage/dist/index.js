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
exports.__esModule = true;
var react_1 = require('react');
var react_router_dom_1 = require('react-router-dom');
var AuthorizationBySocialMedia_1 = require('../../../../components/AuthorizationBySocialMedia');
var config_1 = require('../../../../config');
var form_1 = require('./form');
require('./styles.scss');
var MixPanel_1 = require('../../../../utils/MixPanel');
var LoginPage = /** @class */ (function(_super) {
  __extends(LoginPage, _super);
  function LoginPage() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.componentDidMount = function() {
      localStorage.removeItem('loginType');
      MixPanel_1.Logout();
    };
    return _this;
  }
  LoginPage.prototype.render = function() {
    var _a = this.props,
      handleSubmit = _a.handleSubmit,
      handleForgotPassword = _a.handleForgotPassword,
      history = _a.history;
    var data = {
      facebook: {
        text: 'Facebook'
      },
      google: {
        text: 'Google'
      }
    };
    return react_1['default'].createElement(
      'div',
      { className: 'login' },
      react_1['default'].createElement(
        'div',
        { className: 'modal-window__header' },
        react_1['default'].createElement('h2', null, 'LOG IN'),
        react_1['default'].createElement(react_router_dom_1.Link, {
          to: config_1.Routes.HOME,
          className: 'modal-window__close',
          title: 'Close'
        })
      ),
      react_1['default'].createElement(
        'div',
        { className: 'modal-window__content' },
        react_1['default'].createElement(form_1['default'], {
          handleSubmit: handleSubmit,
          handleForgotPassword: handleForgotPassword
        }),
        react_1['default'].createElement(AuthorizationBySocialMedia_1['default'], {
          history: history,
          title: 'or log in with',
          google: data.google,
          facebook: data.facebook
        }),
        react_1['default'].createElement(
          'div',
          { className: 'modal-window__sign-up' },
          react_1['default'].createElement(
            'p',
            null,
            'Don\u2019t have an account? ',
            react_1['default'].createElement(
              react_router_dom_1.Link,
              { to: config_1.Routes.SIGN_UP },
              'Sign up'
            )
          )
        )
      )
    );
  };
  return LoginPage;
})(react_1.Component);
exports['default'] = LoginPage;
