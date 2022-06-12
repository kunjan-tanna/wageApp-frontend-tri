import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Routes } from '../../config';
import PageFooterMobileApps from './components/PageFooterMobileApps';
import PageFooterNav from './components/PageFooterNav';
import States from './components/States';
import { IProps } from './types';

import './styles.scss';

class PageFooter extends Component<IProps> {
  public componentDidMount = () => {
    const { statesRequest } = this.props;
    statesRequest();
  };

  public render() {
    return (
      <footer className="page-footer wage-home-footer">
        {this._renderStates()}
        {this._renderFooterMobileApps()}
        <PageFooterNav />
      </footer>
    );
  }

  private _renderStates = () => {
    const { location, statesList } = this.props;

    return (
      location.pathname === Routes.HOME &&
      statesList.length > 0 && (
        <div className="container">
          <States statesList={statesList} />
        </div>
      )
    );
  };

  private _renderFooterMobileApps = () => {
    const { location } = this.props;

    return (
      (location.pathname === Routes.HOME || location.pathname === Routes.ABOUT_APP) && (
        <PageFooterMobileApps />
      )
    );
  };
}

export default withRouter(PageFooter);
