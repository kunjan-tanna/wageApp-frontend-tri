import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../../../config';
import { about as aboutMenu } from '../../../../data/menu';
import Button from '../../../Button';
import Tooltip from '../../../Tooltip';
import { IProps } from './types';

const HeaderMenuUnauthorized: FC<IProps> = ({ tooltips, toggleTooltip }: IProps) => {
  return (
    <>
      <li className="nav-menu__item post-task">
        <Link to={Routes.ADD_TASK}>
          <Button label="Post a job" variant="add" />
        </Link>
      </li>
      {/* <li className="nav-menu__item">
        <div
          className="nav-menu__button nav-menu__button--dropdown"
          onClick={() => toggleTooltip('menuAbout1')}
        >
          About
        </div>
        <Tooltip isOpen={tooltips.menuAbout1} onClickOutside={() => toggleTooltip('menuAbout1')}>
          <ul className="page-header__subMenu">
            {aboutMenu.map(({ label, path }) => (
              <li key={`${label}${path}`}>
                <Link to={path!()} className="page-header__subMenu__item">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Tooltip>
      </li> */}
      <li className="nav-menu__item signIn">
        <Link to={Routes.LOGIN} className="nav-menu__button">
          Sign in
        </Link>
      </li>
      <li className="nav-menu__item no-border">
        <Link to={Routes.SIGN_UP} className="nav-menu__button sign_up">
          Join
        </Link>
      </li>
    </>
  );
};

export default HeaderMenuUnauthorized;
