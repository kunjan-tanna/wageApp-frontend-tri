import React from 'react';

import { IProps } from './types';

import './styles.scss';

const Button = (props: IProps) => {
  const { type, label, variant, disabled, onClick } = props;
  if (!type) {
    return (
      <div className={`button button--${variant}`} onClick={onClick}>
        {label}
      </div>
    );
  }

  return (
    <button
      className={`button button--${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
