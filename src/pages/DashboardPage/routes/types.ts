import { ComponentClass,FunctionComponent } from 'react';

export interface IDashboardSidebarItem {
    name: string;
    path: string;
    icon: string;
    component: ComponentClass<any, any> | FunctionComponent<any>;
}