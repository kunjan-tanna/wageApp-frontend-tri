import About from './About';
import Contact from './Contact';
import Features from './Features';
import HelpCenter from './HelpCenter';
import HelpCenterMobile from './HelpCenterMobile';
import Privacy from './Privacy';
import TermsConditions from './TermsConditions';

import { Routes } from '../../../config';
import { INavigationItem } from './types';

export const routes: INavigationItem[] = [
  {
    name: 'Help center',
    path: Routes.ABOUT_HELP,
    component: HelpCenter
  },
  {
    name: 'About App',
    path: Routes.ABOUT_APP,
    component: About
  },
  {
    name: 'Features',
    path: Routes.ABOUT_FEATURES,
    component: Features
  },
  {
    name: 'Terms & Conditions',
    path: Routes.ABOUT_TERMS,
    component: TermsConditions
  },
  {
    name: 'Privacy',
    path: Routes.ABOUT_PRIVACY,
    component: Privacy
  },
  {
    name: 'Contact us',
    path: Routes.ABOUT_CONTACT,
    component: Contact
  }
];
