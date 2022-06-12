import React, { ReactNode } from 'react';

export interface IProps {
  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  value: string | boolean;
  label?: string | ReactNode;
  touched?: boolean;
  error?: string;
}