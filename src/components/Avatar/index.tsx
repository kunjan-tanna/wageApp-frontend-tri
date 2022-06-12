import classnames from 'classnames';
import React from 'react';

import { ApiConfig } from '../../config';
import { AccountTypes } from '../../types';
import './styles.scss';
import { IProps } from './types';


const Avatar = ({ avatarUrl, accountType, name, unread }: IProps) => {

  const className = classnames(
    'avatar',
    {
      'avatar--business': accountType === AccountTypes.BUSINESS,
      'avatar--unread': unread
    }
  );

  return (
    <div className={className}>
      {avatarUrl ?
        <img src={`${ApiConfig.URL}${avatarUrl}`} alt={name}/>
        :
        <i className="icon icon--profile-color"/>
      }
    </div>
  );
};

export default Avatar;