import {ILocation} from '../../../../types';
import {OfferType} from '../../../../types/offers';

export interface IMarkerInternal extends ILocation {
    title: string;
    type?: OfferType;
    link?: string;
}

export interface IMarkerExternal {
    id: number;
    location: ILocation,
    title: string;
    type?: OfferType;
    link?: string;
}