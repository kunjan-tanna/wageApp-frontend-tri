import React from 'react';

import { IProps } from './types';

import './styles.scss';

const RadioButton = (props: IProps) => {

  const { name, value, onChange, onBlur, label, error, touched, id, desc } = props;

  return (
    <div className="radio">
      <label htmlFor={id}>
        <input
          className="radio__field"
          type="radio"
          name={name}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={id}
          checked={id === value}
        />
        {label &&
        <span className="radio__label">
          {label}
          {
            desc &&
            <small className="radio__label__desc">
              {desc}
            </small>
          }
        </span>
        }
      </label>
      {error && touched && <div className="error">{error}</div>}
    </div>
  );
};

export default RadioButton;
