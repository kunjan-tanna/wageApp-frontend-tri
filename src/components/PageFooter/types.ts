import { RouteComponentProps } from 'react-router';
import { IState as IStateListElement } from '../../modules/States/types';


export interface IProps extends RouteComponentProps {
  statesList: IStateListElement[];
  statesRequest: () => void;
}
