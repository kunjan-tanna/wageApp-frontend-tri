import React from 'react';

export interface IProps {
  name: string;
  onFocus?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  initialValue: string;
  readOnly?: boolean;
  disabled?: boolean;
  touched?: boolean;
  placeholder?: string;
  placeholderDescription?: string;
  error?: string;
  id?: string;
  iconName?: string;
  additionalClass?: string;
  autocomplete?: string;
  onPhoneChange: (phoneNumber: string) => void;
}
