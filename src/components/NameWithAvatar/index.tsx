import React, { Component } from 'react';

import { ApiConfig } from '../../config';
import { IProps } from './types';

import './styles.scss';

export default class NameWithAvatar extends Component<IProps> {
  public static defaultProps: IProps = {
    user: {}
  };

  public render() {
    const { firstName, lastName, businessName, avatarUrl } = this.props.user;

    if (businessName) {
      return (
        <div className="name-with-avatar">
          {avatarUrl ? (
            <img className="name-with-avatar__img" src={`${ApiConfig.URL}${avatarUrl}`} alt="" />
          ) : (
            <span className="name-with-avatar__icon">
              <i className="icon icon--profile-color" />
            </span>
          )}
          <h3 className="name-with-avatar__name">{businessName}</h3>
        </div>
      );
    } else {
      return (
        <div className="name-with-avatar">
          {avatarUrl ? (
            <img className="name-with-avatar__img" src={`${ApiConfig.URL}${avatarUrl}`} alt="" />
          ) : (
            <span className="name-with-avatar__icon">
              <i className="icon icon--profile-color" />
            </span>
          )}
          <h3 className="name-with-avatar__name">
            {firstName} {lastName}
          </h3>
        </div>
      );
    }
  }
}
