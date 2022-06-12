import './styles.scss';

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';

import { Routes } from '../../../../config';
import { IProps } from './types';

class DashboardAddJob extends PureComponent<IProps> {
  public render() {
    const { offerType, selectedOfferId } = this.props;

    if (selectedOfferId) {
      return null;
    }

    return (
      <div onClick={this._addTaskRedirect} className="dashboard-add-job">
        <div className="dashboard-add-job__content">
          <h5 className="dashboard-add-job__content__title">Add your</h5>
          <div className="dashboard-add-job__content__description">first {offerType}</div>
          <span className="icon icon--plus" />
        </div>
      </div>
    );
  }

  private _addTaskRedirect = () => {
    const { offerType } = this.props;
    this.props.history.push(`${Routes.ADD_TASK}?type=${offerType.toLowerCase()}`);
  };
}

export default withRouter(DashboardAddJob);
