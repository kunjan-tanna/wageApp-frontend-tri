import {ILocation} from '../../../../types';

export interface IMarkerClusterExternal extends ILocation {
    numPoints: number;
    increaseZoomAndCenter: (center: ILocation) => void;
}