import React, { FC } from 'react';

import MoreOptions from '../../../../components/MoreOptions';
import MultiOffer from '../MultiOffer';
import { IProps } from './types';

import './styles.scss';

const DashboardItemHeader: FC<IProps> = ({
  title,
  itemsCount,
  domContent,
  additionalClassName,
  multiOffer
}) => {
  return (
    <>
      <div className={`dashboard-header${additionalClassName ? ' ' + additionalClassName : ''}`}>
        <div className="dashboard-header__info">
          <h2 className="dashboard-header__title">{title}</h2>
          {title === 'Jobs' && (
            <MoreOptions
              items={[
                {
                  label: 'You are looking to hire'
                }
              ]}
            />
          )}
          {title === 'Workers' && (
            <MoreOptions
              items={[
                {
                  label: ' You have a service to offer'
                }
              ]}
            />
          )}
        </div>
        {multiOffer && <MultiOffer />}
        <div className="dashboard-header__content">
          {domContent && <div className="dashboard-header__additional-content">{domContent}</div>}
          {Number.isInteger(itemsCount!) && (
            <span className="dashboard-header__items-count">
              All: <strong>{itemsCount}</strong>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardItemHeader;
