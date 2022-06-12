import { RouteComponentProps } from 'react-router';

import { IConfirmationModalRequestPayload } from '../../modules/CurrentUser/types';

export interface IProps extends RouteComponentProps<IMatch> {
  title: string;
  successMessage: string;
  requestMethod: (payload: IConfirmationModalRequestPayload) => void;
}

export interface IMatch {
  queryString: string;
}
