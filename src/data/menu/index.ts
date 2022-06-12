import { Routes } from '../../config';
import { IMenuItem } from './types';

export const about: IMenuItem[] = [
  {
    label: 'About',
    path: () => Routes.ABOUT_APP
  },
  {
    label: 'Features',
    path: () => '/about/features'
  },
  {
    label: 'Help center',
    path: () => '/about/help'
  },
  {
    label: 'Terms',
    path: () => '/about/terms'
  },
  {
    label: 'Privacy',
    path: () => '/about/privacy'
  },
  {
    label: 'Contact Us',
    path: () => '/about/contact'
  }
];

export const unauthorized: IMenuItem[] = [
  {
    label: 'Post task',
    path: () => Routes.ADD_TASK
  },
  {
    label: 'About',
    children: about
  },
  {
    label: 'Log in',
    path: () => Routes.LOGIN
  },
  {
    label: 'Sign up',
    path: () => Routes.SIGN_UP
  }
];

export const dashboard: IMenuItem[] = [
  {
    label: 'Jobs',
    path: () => Routes.DASHBOARD_GIGS,
    icon: 'gigs-color'
  },
  {
    label: 'Services',
    path: () => Routes.DASHBOARD_SERVICES,
    icon: 'services-color'
  },
  // {
  //   label: 'Messages',
  //   path: () => Routes.DASHBOARD_MESSAGES,
  //   icon: 'messages-color'
  // },
  {
    label: 'Block people',
    path: () => Routes.DASHBOARD_BLOCK_PEOPLE,
    icon: 'block-color'
  },
  {
    label: 'My profile',
    path: () => Routes.DASHBOARD_PROFILE,
    icon: 'profile-color'
  },
  {
    label: 'Log out',
    path: () => '/logout',
    icon: 'logout-color'
  }
];
