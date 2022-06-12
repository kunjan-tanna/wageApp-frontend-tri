import './styles.scss';

import classnames from 'classnames';
import React, { Component } from 'react';

import { IProps } from './types';

export default class MoreOptions extends Component<IProps> {
  public static defaultProps: IProps = {
    items: [],
    classModifiers: []
  };

  public render() {
    const { classModifiers } = this.props;
    const additionalClasses =
      classModifiers.length > 0 ? classModifiers.map(cn => `more-options--${cn}`) : [];
    const classNames = classnames('more-options', ...additionalClasses);

    return (
      <nav className={classNames}>
        <ul className="more-options__list">{this._renderItems()}</ul>
      </nav>
    );
  }

  private _renderItems = () => {
    const { items } = this.props;

    return items.map(({ label, method, iconName, customComponent }) => {
      if (customComponent) {
        return (
          <li key={label} className="more-options__item">
            {customComponent}
          </li>
        );
      }

      return (
        <li key={label} className="more-options__item" onClick={method}>
          {iconName && <i className={`icon icon--${iconName}`} />}
          {label}
        </li>
      );
    });
  };
}
