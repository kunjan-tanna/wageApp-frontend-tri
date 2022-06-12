import React from 'react';

import { IProps } from './types';

import './styles.scss';


const ChatAlertMessage = ({ text }: IProps) => (
  <div className="dashboard__page-content-block">
    <div className="dashboard-card dashboard-card--chat">
      <p>{text}</p>
    </div>
  </div>
);

export default ChatAlertMessage;