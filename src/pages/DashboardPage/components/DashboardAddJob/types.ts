import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps {
  offerType: string;
  selectedOfferId: number;
}
