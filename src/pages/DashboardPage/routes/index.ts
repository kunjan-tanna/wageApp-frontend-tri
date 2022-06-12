import { Routes } from '../../../config';
import BlockPeople from './DashboardBlockPeople';
import Gigs from './DashboardGigs';
import Messages from './DashboardMessages';
import Notifications from './DashboardNotifications';
import Profile from './DashboardProfile';
import Services from './DashboardServices';
import { IDashboardSidebarItem } from './types';

export const routes: IDashboardSidebarItem[] = [
  {
    name: 'Jobs',
    icon: 'gigs',
    path: Routes.DASHBOARD_GIGS,
    component: Gigs
  },
  {
    name: 'Services',
    icon: 'services',
    path: Routes.DASHBOARD_SERVICES,
    component: Services
  },
  // {
  //   name: 'Messages',
  //   icon: 'messages',
  //   path: Routes.DASHBOARD_MESSAGES,
  //   component: Messages
  // },
  {
    name: 'Notifications',
    icon: 'notifications',
    path: Routes.DASHBOARD_NOTIFICATIONS,
    component: Notifications
  },
  {
    name: 'Blocked people',
    icon: 'block',
    path: Routes.DASHBOARD_BLOCK_PEOPLE,
    component: BlockPeople
  },
  {
    name: 'My profile',
    icon: 'profile',
    path: Routes.DASHBOARD_PROFILE,
    component: Profile
  }
];
