import React, { FC } from 'react';
import { IProps } from './types';

import './styles.scss';

const DashboardInfo: FC<IProps> = ({ text }) => {

  return (
    <div className="dashboard-info-content">
      <div className="dashboard-info-content__item dashboard-card">
        <p>{text}</p>
      </div>
    </div>
  )
};

export default DashboardInfo;
