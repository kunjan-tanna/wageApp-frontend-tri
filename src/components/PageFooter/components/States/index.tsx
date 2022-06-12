import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../../config';
import { IProps } from './types';

import './styles.scss';

class States extends Component<IProps> {
  public render() {
    return (
      <div className="page-footer__states">
        <h3>Choose your state</h3>
        {this._renderStates()}
      </div>
    );
  }

  private _renderStates = () => {
    const { statesList } = this.props;

    return (
      <ul>
        {statesList.map(state => (
          <li key={state.stateShortName}>
            <Link to={`${Routes.OFFERS_LIST}?offerType=&stateShortName=${state.stateShortName}`}>
              {state.stateFullName}
            </Link>
          </li>
        ))}
      </ul>
    );
  };
}

export default States;
