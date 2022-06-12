import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { IDispatchProps, IProps, IState } from './types';

import { Routes } from '../../config';
import { Actions, loginExternalRequest } from '../../modules/Login/actions';
import { IWindow } from '../../types';

import './styles.scss';
import Geocode from 'react-geocode';
import { identity, mixPanelEvent } from '../../utils/MixPanel/index';
import moment from 'moment';
import mt from 'moment-timezone';
Geocode.setApiKey('AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs');
Geocode.setLanguage('en');
Geocode.setRegion('us');
Geocode.enableDebug();

class AuthorizationBySocialMedia extends PureComponent<IProps, IState> {
  state = {
    lat: '',
    long: '',
    platform: 'website',
    zipcode: ''
  };
  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      this.setState({ lat: position.coords.latitude, long: position.coords.longitude });
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then((res: any) => {
        if (res.status == 'OK') {
          let result = res.results[0];
          if (result) {
            for (var i = 0; i < result.address_components.length; i++) {
              var types = result.address_components[i].types;

              for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                if (types[typeIdx] == 'postal_code') {
                  this.setState({ zipcode: result.address_components[i].short_name });
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
  public render() {
    const { title, facebook, google } = this.props;
    console.log('222222222222222222222222222222222');
    return (
      <div className="by-social-media">
        <h4 className="by-social-media__title">
          <span>{title}</span>
        </h4>
        <ul className="by-social-media__list">
          {/* <SocialButton
            provider='facebook'
            appId='1428170803945213'
            onLoginSuccess={this.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}
          >
            <li
              className="by-social-media__item by-social-media__item--fb by-social-media__item-login--login-button"
            >
              <i className="icon icon--facebook-color" />
              <span>{facebook.text}</span>
            </li>
          </SocialButton> */}
          <li
            onClick={this._responseFacebook}
            className="by-social-media__item by-social-media__item--fb by-social-media__item-login--login-button"
          >
            <i className="icon icon--facebook-color" />
            <span>{facebook.text}</span>
          </li>
          <li
            className="by-social-media__item by-social-media__item--google by-social-media__item--login-button"
            onClick={this._responseGoogle}
          >
            <i className="icon icon--googleplus-color" />
            <span>{google.text}</span>
          </li>
        </ul>
      </div>
    );
  }

  private _responseFacebook = () => {
    const { history, loginExternalRequest } = this.props;

    (window as IWindow & typeof globalThis).FB.login(
      (response: any) => {
        if (response.authResponse) {
          loginExternalRequest({
            accessToken: response.authResponse.accessToken,
            provider: 'facebook',
            Latitude: this.state.lat,
            Longitude: this.state.long,
            loginDeviceType: 'website',
            zipCode: this.state.zipcode
          });

          // Login with Facebook event called here

          localStorage.setItem('loginType', 'Facebook');

          mixPanelEvent('Login', {
            'Log in method': 'Facebook',
            'Log in date': mt(new Date())
              .tz('America/Galapagos')
              .format('MM/DD/YYYY')
          });
          history.push(Routes.HOME);
        }
      },
      { scope: 'email' }
    );
  };

  private _responseGoogle = () => {
    console.log('3333333333333333333333333333333');
    const { history, loginExternalRequest } = this.props;
    (window as IWindow & typeof globalThis).gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((response: any) => {
        let token = (window as IWindow & typeof globalThis).gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getAuthResponse().id_token;
        loginExternalRequest({
          Latitude: this.state.lat,
          Longitude: this.state.long,
          loginDeviceType: 'website',
          zipCode: this.state.zipcode,
          accessToken: token,
          provider: 'google'
        });

        // Login with Google event called here

        console.log('GOOGLE RESPONSE', response);
        localStorage.setItem('loginType', 'Google');
        mixPanelEvent('Login', {
          'Log in method': 'Google',
          'Log in date': mt(new Date())
            .tz('America/Galapagos')
            .format('MM/DD/YYYY')
        });

        console.log('4444444444444444444444444444444444');
        history.push(Routes.HOME);
      });
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        loginExternalRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(null, mapDispatchToProps))(AuthorizationBySocialMedia);
