import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import TextareaSize from 'react-textarea-autosize';

import { IProps } from './types';

import './styles.scss';

const Textarea = (props: IProps) => {
  const {
    name,
    onChange,
    onBlur,
    value,
    error,
    touched,
    id,
    placeholder,
    placeholderDescription,
    iconName,
    minRows
  } = props;

  const [isOver, setOver] = useState(false);
  const [height, setHeight] = useState(0);
  const [disableDis, setDisable] = useState(false);
  const _hideIcon = (maxHeight: number = 252) =>
    height > maxHeight ? setOver(true) : setOver(false);
  const visibleError = error && touched;

  useEffect(() => {
    _hideIcon();
  });

  const fieldWrapperClassnames = classnames('textarea__field-wrapper', {
    'textarea__field-wrapper--no-icon': !iconName
  });
  return (
    <div className="textarea">
      <div className={fieldWrapperClassnames}>
        {iconName && (
          <div className="textarea__icon">
            <i className={`icon icon--${iconName}`} />
          </div>
        )}
        <TextareaSize
          className={`textarea__field${visibleError ? ' textarea__field--error' : ''}`}
          name={name}
          onChange={event => {
            onChange(event);
            setHeight(event.target.getBoundingClientRect().height);
          }}
          minRows={minRows ? minRows : 7}
          maxRows={10}
          onBlur={() => setDisable(false)}
          value={value}
          id={id}
          placeholder={placeholder}
          onFocus={() => setDisable(true)}
        />
        {!isOver && (
          <div className="textarea__field-placeholder">
            {placeholder}
            {placeholderDescription && disableDis === false && (
              <small className="Small">{placeholderDescription}</small>
            )}
          </div>
        )}
      </div>
      {visibleError && <div className="validation-error">{error}</div>}
    </div>
  );
};

export default Textarea;
