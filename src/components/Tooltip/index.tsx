import React, { Component } from 'react';

import { IProps } from './types';

import './styles.scss';

class Tooltip extends Component<IProps> {
  public static defaultProps: IProps = {
    isOpen: false
  };

  public render() {
    const { isOpen, fixedWidth, children, extraClassName } = this.props;

    return (
      <>
        <div
          className={`tooltipCloseHandler ${isOpen ? 'tooltipCloseHandler--open' : null}`}
          onClick={this._onClickOutsideHandler}
        />
        <div
          className={[
            'tooltip',
            isOpen ? 'tooltip--open' : null,
            fixedWidth ? 'tooltip--fixedWidth' : null,
            extraClassName ? extraClassName : null
          ]
            .filter(item => !!item)
            .join(' ')}
        >
          {children}
        </div>
      </>
    );
  }

  private _onClickOutsideHandler = (e: any) => {
    const { onClickOutside } = this.props;

    if (onClickOutside) {
      onClickOutside(e);
    }
  };
}

export default Tooltip;
