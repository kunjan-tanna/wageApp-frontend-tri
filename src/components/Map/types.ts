import { markMapScriptAsLoaded } from '../../modules/MapScript/actions';
import { ILocation } from '../../types';
import { IMarkerExternal } from './components/Marker/types';


export interface IState {
  center: ILocation;
  size: {
    width: number;
    height: number;
  }
  zoom: number;
  clusters: IClusterExtra[];
  bounds: any[];
  marginBounds: any[];
}

export interface IProps {
  markers: IMarkerExternal[];
  options?: IMapOptions;
  markMapScriptAsLoaded: () => void;
}

export interface IDispatchProps {
  markMapScriptAsLoaded: typeof markMapScriptAsLoaded;
}

export interface IClusterExtra {
  location: ILocation;
  numPoints: number,
  id: string,
  points: IClusterPoints[];
}

export interface ICluster {
  wx: number;
  wy: number;
  numPoints: number;
  points: IClusterPoints[];
}

export interface IClusterPoints extends ILocation {
  id: number;
}

export interface IMapOptions {
  styles?: any;
  clickableIcons?: boolean;
  minZoomOverride?: boolean;
  minZoom?: number;
  zoomControl?: boolean;
  mapTypeControl?: boolean;
  scaleControl?: boolean;
  streetViewControl?: boolean;
  rotateControl?: boolean;
  fullscreenControl?: boolean;
}

export interface IDefaultConfig {
  language: string;
  singleItemZoom: number;
  clusters: {
    minZoom: number;
    maxZoom: number;
    radius: number;
  }
  mapOptions: IMapOptions
}