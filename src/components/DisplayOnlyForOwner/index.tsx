import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { IStoreState } from '../../store';
import { IExternalProps, IProps, IState } from './types';

class DisplayOnlyForOwner extends Component<IProps, IState> {
  public render() {
    const {
      children,
      user: { id },
      ownerId
    } = this.props;

    console.log('\n\n\n YES-->', ownerId, id);

    if (ownerId && ownerId === id) {
      return <>{children}</>;
    }

    return null;
  }
}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    user: currentUserSelector(state.currentUser)
  };
};

export default compose<any>(connect(mapStateToProps))(DisplayOnlyForOwner);
