import React from 'react';

export interface IProps {
  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onFocus?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  value: string | boolean | number | undefined;
  readOnly?: boolean;
  disabled?: boolean;
  touched?: boolean;
  type?: string;
  placeholder?: string;
  placeholderDescription?: string;
  error?: string | String;
  toggleVisibilityBtn?: boolean;
  id?: string;
  iconName?: string;
  additionalClass?: string;
  autocomplete?: string;
  pattern?: string;
}
