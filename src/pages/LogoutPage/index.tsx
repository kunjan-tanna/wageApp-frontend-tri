import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { currentUserSelector, isAuthorizedSelector } from '../../modules/CurrentUser/selectors';

import { Actions, logoutRequest } from '../../modules/Login/actions';

import { Routes } from '../../config';
import { IDispatchProps, IProps, IExternalProps } from './types';
import { Logout } from '../../utils/MixPanel/index';

import { IStoreState } from '../../store';
import { db, Firebase } from '../../utils/Firebase/index';

class HomePageContainer extends Component<IProps> {
  public async componentDidMount() {
    const { logoutRequest, user } = this.props;
    console.log('\n\n\n USER iSS', user);
    localStorage.removeItem('loginType');
    Logout();
    if (Firebase.messaging.isSupported()) {
      let messaging = Firebase.messaging();
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then(token => {
          console.log('token::', token);
          db.collection('Users')
            .doc(user.id)
            .collection('token')
            .doc(token)
            .delete();
        });
    }
    logoutRequest();
  }

  public render() {
    return <Redirect to={Routes.HOME} />;
  }
}
const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    user: currentUserSelector(state.currentUser)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        logoutRequest
      },
      dispatch
    )
  };
};

export default compose<any>(connect(mapStateToProps, mapDispatchToProps))(HomePageContainer);
