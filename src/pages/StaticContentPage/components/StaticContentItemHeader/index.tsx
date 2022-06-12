import React, { FC } from 'react';

import { IProps } from './types';

import './styles.scss';


const DashboardItemHeader: FC<IProps> = ({ title }) => {
  return (
    <div className="static-content__header">
      <h2 className="static-content__header__title">{title}</h2>
    </div>
  );
};


export default DashboardItemHeader;