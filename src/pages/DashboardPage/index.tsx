import React, { Component } from 'react';
import { IExternalProps, IProps } from './types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { currentUserSelector } from '../../modules/CurrentUser/selectors';
import { IStoreState } from '../../store';
import DashboardPage from './page';

class DashboardContainer extends Component<IProps> {

  public render() {

    const {
      currentUser: {
        accountType
      }
    } = this.props;
    
    return (
      <DashboardPage accountType={accountType}/>
    );
  }

}

const mapStateToProps = (state: IStoreState): IExternalProps => {
  return {
    currentUser: currentUserSelector(state.currentUser)
  };
};

export default compose<any>(
  connect(
    mapStateToProps
  )
)(DashboardContainer);
