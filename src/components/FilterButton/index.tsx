import React from 'react';

import './styles.scss';
import { IProps } from './types';

const FilterButton = (props: IProps) => {
  const {
    label,
    isSelected,
    isActive,
    onClick,
    onClear,
  } = props;

  const classes = [
    'filterButton',
    isSelected ? 'filterButton--selected' : null,
    isActive ? 'filterButton--active' : null,
  ];

  return (
    <div className={classes.filter(item => (!!item)).join(' ')} onClick={(e) => { e.preventDefault(); onClick(); }}>
      {label}
      <button className="filterButton__clear" onClick={onClear}>clear</button>
    </div>
  );
};

export default FilterButton;
