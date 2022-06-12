import './styles.scss';

import React from 'react';

import MoreOptions from '../MoreOptions';
import { IProps } from './types';

const ErrorTooltip = ({ message, position }: IProps) => {
  return (
    <span className="error-tooltip">
      <MoreOptions
        items={[
          {
            label: message
          }
        ]}
        classModifiers={[position === 'right' ? 'right' : '']}
      />
    </span>
  );
};

export default ErrorTooltip;
