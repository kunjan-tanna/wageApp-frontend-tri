import React from 'react';
import NumberFormat from 'react-number-format';

interface IProps {
  value: number,
}

export default (props: IProps) => {
  const { value } = props;

  return <NumberFormat value={value} displayType='text' thousandSeparator={true} prefix='$' />;
};