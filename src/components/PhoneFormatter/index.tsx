import './styles.scss';

import React from 'react';
import { conformToMask } from 'react-text-mask';

import getPhoneMaskRegex from '../../utils/GetPhoneMaskRegex';
import { IProps } from './types';

const PhoneFormatter = (props: IProps) => {
  const { value } = props;
  const format = conformToMask(value, getPhoneMaskRegex(value, value.length), {});

  return <span className="phone-formatter">{format.conformedValue.replace(/_/g, '')}</span>;
};

export default PhoneFormatter;
