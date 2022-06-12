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
var react_geocode_1 = require('react-geocode');
var react_redux_1 = require('react-redux');
var redux_1 = require('redux');
var selectors_1 = require('../../modules/Modals/CheckEmail/selectors');
var actions_1 = require('../../modules/SignUp/actions');
var page_1 = require('./page');
var index_1 = require('../../utils/MixPanel/index');
react_geocode_1['default'].setApiKey('AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs');
react_geocode_1['default'].setLanguage('en');
react_geocode_1['default'].setRegion('us');
react_geocode_1['default'].enableDebug();
var SignUpPageContainer = /** @class */ (function(_super) {
  __extends(SignUpPageContainer, _super);
  function SignUpPageContainer() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.state = {
      lat: '',
      long: '',
      platform: 'website',
      zipcode: ''
    };
    _this.componentDidMount = function() {
      index_1.Logout();
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
    _this._handleSignUp = function(values, actions) {
      var signUpRequest = _this.props.signUpRequest;
      values['Latitude'] = _this.state.lat;
      values['Longitude'] = _this.state.long;
      values['loginDeviceType'] = _this.state.platform;
      values['zipCode'] = _this.state.zipcode;
      values['phoneNumber'] = values.businessPhoneNumber;
      signUpRequest({ values: values, actions: actions });
      // Signup event called here
      index_1.mixPanelEvent('Signup', {
        'Account Type': values['accountType'],
        'Signup Method': 'Email',
        'Phone Number': values['phoneNumber'],
        Zipcode: values['zipCode'],
        'Profile Picture': false
      });
      console.log('\n\n &&&&***', values);
    };
    return _this;
  }
  SignUpPageContainer.prototype.render = function() {
    var _a = this.props,
      history = _a.history,
      location = _a.location,
      _b = _a.checkEmail,
      visible = _b.visible,
      userEmail = _b.userEmail;
    return react_1['default'].createElement(page_1['default'], {
      history: history,
      handleSubmit: this._handleSignUp,
      visible: visible,
      email: userEmail
    });
  };
  return SignUpPageContainer;
})(react_1.Component);
var mapStateToProps = function(state) {
  return {
    checkEmail: selectors_1.checkEmailSelector(state)
  };
};
var mapDispatchToProps = function(dispatch) {
  return __assign(
    {},
    redux_1.bindActionCreators(
      {
        signUpRequest: actions_1.signUpRequest
      },
      dispatch
    )
  );
};
exports['default'] = redux_1.compose(react_redux_1.connect(mapStateToProps, mapDispatchToProps))(
  SignUpPageContainer
);
