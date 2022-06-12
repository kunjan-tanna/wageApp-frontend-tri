import { RouteProps } from 'react-router';
import {ICurrentUser} from '../../modules/CurrentUser/types';

export interface IState {}

export interface IProps extends RouteProps {
    user: ICurrentUser;
}

export interface IExternalProps {
    user: ICurrentUser;
}