import classnames from 'classnames';
import React, { FC } from 'react';

import { IProps } from './types';

import './styles.scss';

const InputLabel: FC<IProps> = ({ labelText, labelOptional, children, id, extraClassname }) => {
  const wrapperClassnames = classnames('input-wrapper', {
    [`input-wrapper--${extraClassname}`]: extraClassname
  });

  return (
    <div className={wrapperClassnames}>
      <label className="input-wrapper__label" htmlFor={id}>
        {labelText}
        {labelOptional && <span className="input-wrapper__label__optional">(optional)</span>}
      </label>
      {children}
    </div>
  );
};


export default InputLabel;