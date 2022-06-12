import classnames from 'classnames';
import React, { Component } from 'react';

import { IProps } from './types';

import './styles.scss';

export default class Loading extends Component<IProps> {
  public static defaultProps: IProps = {
    isLoading: true,
    className: '',
  };

  public render() {
    const { className } = this.props;
    const spinnerClassNames = classnames(
      'spinner',
      className
    )

    return (
      <div className={spinnerClassNames}>
        <div className="spinner__indicator">
          <div className="spinner__dot1" />
          <div className="spinner__dot2" />
        </div>
      </div>
    );
  }
}

export const HasIndicator = (isLoading: boolean = Loading.defaultProps.isLoading): string => {
  return isLoading ? 'loading__container loading__isLoading' : 'loading__container loading__isLoaded';
};
