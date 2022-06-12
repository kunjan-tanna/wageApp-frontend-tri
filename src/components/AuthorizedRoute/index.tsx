import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { compose } from 'redux';

import { Routes } from '../../config';
import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { IStoreState } from '../../store';
import { IExternalProps, IProps, IState } from './types';


class AuthorizedRoute extends Component<IProps, IState> {

  public render() {

    const { location, user } = this.props;
    const logged = !!user.email;

    if (!logged) {
      return <Redirect to={{
        pathname: Routes.LOGIN,
        state: { from: location && location.hasOwnProperty('pathname') ? location.pathname : '' }
      }}/>
    }

    return (
      <Route {...this.props} />
    )
  }
};

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    user: currentUserSelector(state.currentUser)
  };
};

export default compose<any>(
  connect(mapStateToProps)
)(AuthorizedRoute);
