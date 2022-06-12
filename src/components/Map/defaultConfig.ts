import style from './style';
import {IDefaultConfig} from './types';

const defaultConfig : IDefaultConfig = {
    language: 'en',
    singleItemZoom: 12,
    clusters: {
        minZoom: 3,
        maxZoom: 17,
        radius: 60
    },
    mapOptions: {
        styles: style,
        clickableIcons: false,
        minZoomOverride: true,
        minZoom: 3,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
    }
};

export default defaultConfig;