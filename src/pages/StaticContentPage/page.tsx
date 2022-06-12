import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Routes } from '../../config';
import Navigation from './components/StaticContentNavigation';
import { routes } from './routes';
import { IPageProps } from './types';

import './styles.scss';


class StaticContent extends Component<IPageProps> {

  public render() {
    return (
      <div className="static-content">
        <div className="container">
          <div className="row">
            <Navigation/>
            <div className="static-content__main">
              {this._renderRoutes()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private _renderRoutes = () => {

    return (
      <Switch>
        <Route path={Routes.ABOUT} exact={true} render={() => <Redirect to={routes[0].path}/>}/>
        {routes.map(item => (
          <Route key={item.name} path={item.path} component={item.component}/>
        ))}
        <Route render={() => <Redirect to={Routes.ERROR_404}/>}/>
      </Switch>
    );
  };
}


export default StaticContent;
