import React, { Component } from 'react';
import Geocode from 'react-geocode';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { checkEmailSelector } from '../../modules/Modals/CheckEmail/selectors';
import { Actions, signUpRequest } from '../../modules/SignUp/actions';
import { IStoreState } from '../../store';
import SignUpPage from './page';
import { IDispatchProps, IExternalProps, IFormValues, IProps } from './types';
import {
  Logout,
  mixPanelEvent,
  setUserProfile,
  identity,
  createAlias
} from '../../utils/MixPanel/index';
Geocode.setApiKey('AIzaSyDRBumq-xj5aw8Psutvq0rwmgOL0gHNLBs');
Geocode.setLanguage('en');
Geocode.setRegion('us');
Geocode.enableDebug();
class SignUpPageContainer extends Component<IProps> {
  state = {
    lat: '',
    long: '',
    platform: 'website',
    zipcode: ''
  };
  componentDidMount = () => {
    Logout();
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
    const {
      history,
      location,
      checkEmail: { visible, userEmail }
    } = this.props;
    return (
      <SignUpPage
        history={history}
        handleSubmit={this._handleSignUp}
        visible={visible}
        email={userEmail}
      />
    );
  }

  private _handleSignUp = (values: IFormValues, actions: any) => {
    const { signUpRequest } = this.props;
    values['Latitude'] = this.state.lat;
    values['Longitude'] = this.state.long;
    values['loginDeviceType'] = this.state.platform;
    values['zipCode'] = values.zipcode;
    values['phoneNumber'] = values.businessPhoneNumber;
    delete values['confirmpassword'];
    delete values['zipcode'];

    signUpRequest({ values, actions });

    //Signup event called here
    createAlias(values.email);
    identity(values.email);

    mixPanelEvent('Sign up', {
      'Account Type': values['accountType'] == 'Internal' ? 'Personal' : 'Business',
      'Signup Method': 'Email',
      'Phone Number': values['phoneNumber'],
      Zipcode: values['zipCode'],
      'Profile Picture': false
    });

    setUserProfile({
      'Account Type': values['accountType'] == 'Internal' ? 'Personal' : 'Business',
      $phone: values['phoneNumber'],
      $email: values.email,
      'Website URL': values.businessWebAddress || '-'
    });

    console.log('\n\n &&&&***', values);
  };
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    checkEmail: checkEmailSelector(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        signUpRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(SignUpPageContainer);
