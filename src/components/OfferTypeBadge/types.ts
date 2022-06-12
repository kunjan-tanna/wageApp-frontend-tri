import { OfferType } from '../../types/offers';

type size = 'small';

export interface IProps {
    type: OfferType;
    size?: size;
}