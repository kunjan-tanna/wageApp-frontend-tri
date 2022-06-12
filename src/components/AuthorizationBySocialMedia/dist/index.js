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
var actions_1 = require('../../modules/Login/actions');
require('./styles.scss');
var react_geocode_1 = require('react-geocode');
react_geocode_1['default'].setApiKey('AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs');
react_geocode_1['default'].setLanguage('en');
react_geocode_1['default'].setRegion('us');
react_geocode_1['default'].enableDebug();
var AuthorizationBySocialMedia = /** @class */ (function(_super) {
  __extends(AuthorizationBySocialMedia, _super);
  function AuthorizationBySocialMedia() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      lat: '',
      long: '',
      platform: 'website',
      zipcode: ''
    };
    _this.componentDidMount = function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        _this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
        react_geocode_1['default']
          .fromLatLng(position.coords.latitude, position.coords.longitude)
          .then(function(res) {
            if (res.status == 'OK') {
              var result = res.results[0];
              if (result) {
                for (var i = 0; i < result.address_components.length; i++) {
                  var types = result.address_components[i].types;
                  for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                    if (types[typeIdx] == 'postal_code') {
                      _this.setState({ zipcode: result.address_components[i].short_name });
                    }
                  }
                }
              } else {
                console.log('No results found');
              }
            }
            console.log('\n\n NNNNNNBNBBNBNBBN', res);
          });
      });
    };
    _this._responseFacebook = function() {
      var _a = _this.props,
        history = _a.history,
        loginExternalRequest = _a.loginExternalRequest;
      window.FB.login(
        function(response) {
          if (response.authResponse) {
            loginExternalRequest({
              accessToken: response.authResponse.accessToken,
              provider: 'facebook',
              Latitude: _this.state.lat,
              Longitude: _this.state.long,
              loginDeviceType: 'website',
              zipCode: _this.state.zipcode
            });
            // Login with Facebook event called here
            localStorage.setItem('loginType', 'Facebook');
            // mixPanelEvent('Login', {
            //   'Log in method': 'Facebook',
            //   'Log in date': mt(new Date()).tz('America/Galapagos').format('MM/DD/YYYY')
            // });
          }
          // history.push(Routes.HOME);
        },
        { scope: 'email' }
      );
    };
    _this._responseGoogle = function() {
      console.log('3333333333333333333333333333333');
      var _a = _this.props,
        history = _a.history,
        loginExternalRequest = _a.loginExternalRequest;
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(function(response) {
          var token = window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse().id_token;
          loginExternalRequest({
            Latitude: _this.state.lat,
            Longitude: _this.state.long,
            loginDeviceType: 'website',
            zipCode: _this.state.zipcode,
            accessToken: token,
            provider: 'google'
          });
          // Login with Google event called here
          console.log('GOOGLE RESPONSE', response);
          localStorage.setItem('loginType', 'Google');
          // mixPanelEvent('Login', {
          //   'Log in method': 'Google',
          //   'Log in date': mt(new Date()).tz('America/Galapagos').format('MM/DD/YYYY')
          // });
          console.log('4444444444444444444444444444444444');
          // history.push(Routes.HOME);
        });
    };
    return _this;
  }
  AuthorizationBySocialMedia.prototype.render = function() {
    var _a = this.props,
      title = _a.title,
      facebook = _a.facebook,
      google = _a.google;
    console.log('222222222222222222222222222222222');
    return react_1['default'].createElement(
      'div',
      { className: 'by-social-media' },
      react_1['default'].createElement(
        'h4',
        { className: 'by-social-media__title' },
        react_1['default'].createElement('span', null, title)
      ),
      react_1['default'].createElement(
        'ul',
        { className: 'by-social-media__list' },
        react_1['default'].createElement(
          'li',
          {
            onClick: this._responseFacebook,
            className:
              'by-social-media__item by-social-media__item--fb by-social-media__item-login--login-button'
          },
          react_1['default'].createElement('i', { className: 'icon icon--facebook-color' }),
          react_1['default'].createElement('span', null, facebook.text)
        ),
        react_1['default'].createElement(
          'li',
          {
            className:
              'by-social-media__item by-social-media__item--google by-social-media__item--login-button',
            onClick: this._responseGoogle
          },
          react_1['default'].createElement('i', { className: 'icon icon--googleplus-color' }),
          react_1['default'].createElement('span', null, google.text)
        )
      )
    );
  };
  return AuthorizationBySocialMedia;
})(react_1.PureComponent);
var mapDispatchToProps = function(dispatch) {
  return __assign(
    {},
    redux_1.bindActionCreators(
      {
        loginExternalRequest: actions_1.loginExternalRequest
      },
      dispatch
    )
  );
};
exports['default'] = redux_1.compose(react_redux_1.connect(null, mapDispatchToProps))(
  AuthorizationBySocialMedia
);
