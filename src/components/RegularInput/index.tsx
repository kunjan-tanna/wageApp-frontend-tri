import './styles.scss';

import classnames from 'classnames';
import React, { useState } from 'react';

import { IProps } from './types';

const Input = (props: IProps) => {
  const {
    autocomplete,
    name,
    disabled,
    readOnly,
    onChange,
    onBlur,
    onFocus,
    value,
    placeholder,
    placeholderDescription,
    error,
    touched,
    toggleVisibilityBtn,
    id,
    iconName,
    additionalClass,
    pattern
  } = props;
  const [type, _toggleVisibility] = useState(props.type);
  const visiblePassword = type === 'password';
  const visibleError = error && touched;
  const inputClassnames = classnames('input', {
    [`input--${additionalClass}`]: additionalClass
  });
  const fieldWrapperClassnames = classnames('input__field-wrapper', {
    'input__field-wrapper--no-icon': !iconName
  });

  function onKeyDown(keyEvent: any) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  return (
    <div className={inputClassnames}>
      <div className={fieldWrapperClassnames}>
        {iconName && (
          <div className="input__icon">
            <i className={`icon icon--${iconName}`} />
          </div>
        )}
        <input
          className={`input__field${visibleError ? ' input__field--error' : ''}`}
          type={type ? type : 'text'}
          name={name}
          maxLength={name == 'zipcode' ? 5 : undefined}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={value as string}
          placeholder={placeholder}
          readOnly={readOnly}
          id={id}
          autoComplete={autocomplete}
          onKeyDown={onKeyDown}
          pattern={pattern}
        />
        <div className="input__field-placeholder">
          {placeholder}
          {placeholderDescription && <small>{placeholderDescription}</small>}
        </div>
        {toggleVisibilityBtn && (
          <button
            className="input__password-visibility"
            type="button"
            onClick={() => _toggleVisibility(visiblePassword ? 'text' : 'password')}
          >
            <i className={`icon ${visiblePassword ? 'icon--no-eye' : 'icon--eye'}`} />
          </button>
        )}
      </div>

      {visibleError && <div className="validation-error">{error}</div>}
    </div>
  );
};

export default Input;
