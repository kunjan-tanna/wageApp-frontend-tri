import { ReactNode } from 'react';

import { multiOfferRequest } from '../../../../modules/MultiuploadOffers/actions';
import { IFormValues } from '../../../../modules/MultiuploadOffers/types';

export interface IProps {
  title: string;
  itemsCount?: number;
  domContent?: ReactNode;
  additionalClassName?: string;
  handleSubmit?: (values: IFormValues, actions: any) => void;
  multiOffer?: boolean;
}

export interface IDispatchProps {
  multipleFileUploadFileRequest: typeof multiOfferRequest;
}
