import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { IStoreState } from '../../store';
import { IExternalProps, IProps, IState } from './types';


class DisplayOnlyForLogged extends Component<IProps, IState> {

  public render() {

    const { children, user } = this.props;
    const logged = !!user.email;

    if (!logged) {
      return null;
    }

    return (
      <>
        {children}
      </>
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
)(DisplayOnlyForLogged);
