import {ICurrentUser} from '../../modules/CurrentUser/types';

export interface IState {}

export interface IProps extends IExternalProps {
    ownerId: string;
}

export interface IExternalProps {
    user: ICurrentUser;
}