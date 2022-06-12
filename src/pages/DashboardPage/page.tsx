import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Routes } from '../../config';
import DashboardSidebar from './components/DashboardSidebar';
import { routes } from './routes';
import { IPageProps } from './types';

import './styles.scss';

class Dashboard extends Component<IPageProps> {
  public render() {
    const { accountType } = this.props;

    return (
      <div className="dashboard dashboard-new">
        <div className="container">
          <div className="dashboard__row row">
            <DashboardSidebar accountType={accountType} />
            <div className="dashboard__page-content">{this._renderRoutes()}</div>
          </div>
        </div>
      </div>
    );
  }

  private _renderRoutes = () => {
    return (
      <Switch>
        <Route
          path={Routes.DASHBOARD}
          exact={true}
          render={() => <Redirect to={routes[0].path} />}
        />
        {routes.map(item => (
          <Route key={item.name} path={item.path} component={item.component} />
        ))}
        <Route render={() => <Redirect to={Routes.ERROR_404} />} />
      </Switch>
    );
  };
}

export default Dashboard;
