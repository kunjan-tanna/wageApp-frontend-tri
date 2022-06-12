import { ComponentClass, Ref } from 'react';
import { markMapScriptAsLoaded } from '../../modules/MapScript/actions';
import { ILocation } from '../../types';

export interface IState {
  location: ILocation;
  open: boolean;
}

export interface ICurrentLocationButton {
  disabled: boolean;
  visible: boolean;
  label: string;
}

export interface IGeolocationInputComponent {
  name: string;
  externalRef: Ref<HTMLInputElement>;
  currentLocationButton: ICurrentLocationButton;
  currentLocationButtonAction: () => void;
  additionalProps?: IAdditionalProps;
  onChange: (data: any) => void;
}

interface IAdditionalProps {
  resetCount: number;
  placeholder?: string;
  error?: boolean;
  isFromEditProfile: boolean | undefined;
}

export interface IProps {
  scriptLoaded: boolean;
  verbose: boolean;
  currentLocationButton: ICurrentLocationButton;
  initialLocation: ILocation;
  name: string;
  component: ComponentClass<IGeolocationInputComponent>;
  markMapScriptAsLoaded: () => void;
  onLocationChange?: (location: ILocation) => void;
  additionalProps?: IAdditionalProps;
  showLocationMsg?: boolean;
  isFromAddEdit?: boolean;
  map_types?: any;
}

export interface IExternalProps {
  scriptLoaded: boolean;
}

export interface IDispatchProps {
  markMapScriptAsLoaded: typeof markMapScriptAsLoaded;
}
