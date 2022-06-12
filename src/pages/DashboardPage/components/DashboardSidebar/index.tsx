import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Routes } from '../../../../config';
import { routes } from '../../routes';
import { IDashboardSidebarItem } from '../../routes/types';

import { AccountTypes } from '../../../../types';
import './styles.scss';
import { IProps } from './types';

const DashboardSidebar = (props: IProps) => {
  const [collapse, setCollapse] = useState(false);

  const _toggleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={'dashboard__sidebar' + (collapse ? ' dashboard__sidebar--collapsed' : '')}>
      <header className="dashboard__sidebar__header">
        <button onClick={() => _toggleCollapse()} className="dashboard__sidebar__hamburger">
          <i className="icon icon--hamburger" />
        </button>
        <h2 className="dashboard__sidebar__title">Dashboard</h2>
      </header>
      <ul className="dashboard__sidebar__list">{_renderLinks(routes, props)}</ul>
    </div>
  );
};

const _renderLinks = (items: IDashboardSidebarItem[], props: IProps) =>
  items.map(item => {
    // if (props.accountType === AccountTypes.BUSINESS && item.path === Routes.DASHBOARD_SERVICES) {
    //   return null;
    // }

    return (
      <li key={item.name} className="dashboard__siderbar__item">
        <NavLink
          to={item.path}
          className="dashboard__sidebar__link"
          activeClassName="dashboard__sidebar__link--active"
        >
          <i className={`icon icon--${item.icon}`} />
          <span>{item.name}</span>
        </NavLink>
      </li>
    );
  });

export default DashboardSidebar;
