import React from 'react';

import './styles.scss';

import { IProps } from './types';


const Checkbox = (props: IProps) => {

  const { name, onChange, onBlur, value, label, error, touched } = props;
  const visibleError = error && touched;

  return (
    <div className={`checkbox${visibleError ? ' checkbox--error' : ''}`}>
      <label htmlFor={name}>
        <input
          className="checkbox__field"
          type="checkbox"
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value.toString()}
          checked={!!value}
        />
        {label &&
        <span className="checkbox__label">
          {label}
        </span>
        }
      </label>

      {visibleError &&
      <div className="validation-error">{error}</div>
      }
    </div>
  );
};

export default Checkbox;