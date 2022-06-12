import { ComponentClass, FunctionComponent } from 'react';

export interface INavigationItem {
  name: string;
  path: string;
  component: ComponentClass<any, any> | FunctionComponent<any>;
}