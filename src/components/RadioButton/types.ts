import React from 'react';

export interface IProps {
  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  value: string;
  label?: string;
  touched?: boolean;
  error?: string;
  id?: string;
  desc?: string;
}
