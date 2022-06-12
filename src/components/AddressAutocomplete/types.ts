import { ComponentClass, Ref } from 'react';
import { markMapScriptAsLoaded } from '../../modules/MapScript/actions';

export interface IState extends IAddress {}

export interface IAddress {
  address: string;
  city: string;
  zipcode: any;
}

export interface IAddressAutocompleteComponent {
  externalRef: Ref<HTMLInputElement>;
  iconName: string;
  placeholder: string;
  error: string;
  touched: any;
  address: any;
  onChange: (e: React.ChangeEvent<any>) => void;
  onFocus?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
}

export interface IProps {
  scriptLoaded: boolean;
  component: ComponentClass<IAddressAutocompleteComponent>;
  componentProps: any;
  markMapScriptAsLoaded: () => void;
  onLocationChange?: (location: IAddress) => void;
}

export interface IExternalProps {
  scriptLoaded: boolean;
}

export interface IDispatchProps {
  markMapScriptAsLoaded: typeof markMapScriptAsLoaded;
}
