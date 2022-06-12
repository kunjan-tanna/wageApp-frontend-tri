import { Dispatch, SetStateAction } from 'react';
import { IConversationDetailsData } from '../../../../../../modules/Chat/types';
import { IOfferReportState } from '../../../../../../modules/Offer/types';

export interface IProps {
  setVisibleState: Dispatch<SetStateAction<boolean>>;
  details: IConversationDetailsData;
  report: IOfferReportState;
}
