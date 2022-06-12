export type AccountType = 'Internal' | 'Business';

export type Nullable<T> = T | null;

export enum AccountTypes {
  INTERNAL = 'Internal',
  BUSINESS = 'Business'
}

export interface ILocation {
  lat: number;
  lng: number;
  name?: string;
  stateShortName?: string;
  stateFullName?: string;
  locality?: string;
}

export interface IGalleryItem {
  id: number;
  url: string;
  mediaType: string;
}

export interface ISelectOption {
  value: any;
  label: string;
  image?: string;
}

export interface IDistanceSelectOption {
  value: any;
  label: string;
  distanceIndex: number
}

export interface IGeneralState {
  fetched: boolean;
  requesting: boolean;
  success: boolean;
  error: any;
}

export interface IWindow extends Window {
  FB: any;
  gapi: any
}
