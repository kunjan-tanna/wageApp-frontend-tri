import React from 'react';
import { NavLink } from 'react-router-dom';

import { INavigationItem } from '../../routes/types';

import { routes } from '../../routes';

import './styles.scss';

const StaticContentNavigation = () => {
  return (
    <div className="static-content__navigation">
      <ul className="static-content__navigation__list">
        {_renderLinks(routes)}
      </ul>
    </div>
  );
};

const _renderLinks = (items: INavigationItem[]) => items.map(item => {
  return (
    <li key={item.name} className="static-content__navigation__item">
      <NavLink to={item.path} className="static-content__navigation__link">
        {item.name}
      </NavLink>
    </li>
  );
});

export default StaticContentNavigation;