import './styles.scss';

import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';

import { PHONE_MAX_CHAR } from '../../utils/validation/basic-phone-validation';
import { IProps } from './types';
import getPhoneMaskRegex from '../../utils/GetPhoneMaskRegex';

const PhoneInput = (props: IProps) => {
  const {
    autocomplete,
    name,
    disabled,
    readOnly,
    onBlur,
    placeholder,
    placeholderDescription,
    error,
    touched,
    id,
    iconName,
    additionalClass,
    onPhoneChange,
    initialValue
  } = props;
  const visibleError = error && touched;
  const inputClassnames = classnames('input', {
    [`input--${additionalClass}`]: additionalClass
  });
  const fieldWrapperClassnames = classnames('input__field-wrapper', {
    'input__field-wrapper--no-icon': !iconName
  });
  const [maskLength, setMaskLength] = useState(0);
  const [inputValue, setInputValue] = useState(initialValue);
  const replacedValue = inputValue ? inputValue.replace(/\D/g, '') : '';

  useEffect(() => {
    if (initialValue) {
      setMaskLength(initialValue.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onPhoneChange(replacedValue), [replacedValue]);

  return (
    <div className={inputClassnames}>
      <div className={fieldWrapperClassnames}>
        {iconName && (
          <div className="input__icon">
            <i className={`icon icon--${iconName}`} />
          </div>
        )}
        <MaskedInput
          mask={getPhoneMaskRegex(replacedValue, maskLength)}
          className={`input__field${visibleError ? ' input__field--error' : ''}`}
          name={name}
          onChange={ev => setInputValue(ev.target.value)}
          onBlur={onBlur}
          onKeyDown={ev => {
            if (ev.keyCode === 8 || ev.keyCode === 46) {
              setMaskLength(replacedValue.length - 1);
            } else {
              if (replacedValue.length < PHONE_MAX_CHAR) {
                setMaskLength(replacedValue.length + 1);
              }
            }
          }}
          disabled={disabled}
          value={inputValue}
          placeholder={placeholder}
          readOnly={readOnly}
          id={id}
          autoComplete={autocomplete}
        />
        <div className="input__field-placeholder">
          {placeholder}
          {placeholderDescription && <small>{placeholderDescription}</small>}
        </div>
      </div>

      {visibleError && <div className="validation-error">{error}</div>}
    </div>
  );
};

export default PhoneInput;
