import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import supercluster from 'points-cluster';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';

import { ILocation, Nullable } from '../../types';
import './styles.scss';
import { ICluster, IDispatchProps, IProps, IState } from './types';

import { GOOGLE_MAPS_API_KEY } from '../../config';
import { Actions, markMapScriptAsLoaded } from '../../modules/MapScript/actions';
import Marker from './components/Marker';
import MarkerCluster from './components/MarkerCluster';
import defaultConfig from './defaultConfig';

class Map extends Component<IProps, IState> {
  private releaseFitBounds: Nullable<ReturnType<typeof setTimeout>>;

  public constructor(props: IProps) {
    super(props);

    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      size: {
        width: 500,
        height: 500
      },
      zoom: 4,
      clusters: [],
      bounds: [],
      marginBounds: []
    };

    this.releaseFitBounds = null;
  }

  public componentDidMount() {
    const { markers } = this.props;

    if (markers.length > 0) {
      this._fitBounds();
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    const { markers } = this.props;

    if (prevProps.markers !== markers && markers.length > 0) {
      this._fitBounds();
    }
  }

  public componentWillUnmount() {
    if (this.releaseFitBounds) {
      clearTimeout(this.releaseFitBounds);
    }
  }

  public render() {
    const { center, zoom } = this.state;
    const { markMapScriptAsLoaded, options } = this.props;

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GOOGLE_MAPS_API_KEY,
          language: defaultConfig.language,
          libraries: 'places'
        }}
        center={center}
        zoom={zoom}
        onChange={this._handleMapChange}
        yesIWantToUseGoogleMapApiInternals={true}
        options={Object.assign(defaultConfig.mapOptions, options)}
        onGoogleApiLoaded={() => {
          markMapScriptAsLoaded();
        }}
      >
        {this._renderMarkers()}
      </GoogleMapReact>
    );
  }

  private _renderMarkers = () => {
    const { clusters } = this.state;
    const { markers } = this.props;

    return clusters.map(item => {
      const {
        numPoints,
        points,
        location: { lat, lng }
      } = item;

      if (numPoints === 1) {
        const singleMarker = markers.find(item => item.id === points[0].id);

        return singleMarker ? (
          <Marker
            key={singleMarker!.id}
            lat={singleMarker!.location.lat}
            lng={singleMarker!.location.lng}
            title={singleMarker!.title}
            type={singleMarker!.type}
            link={singleMarker!.link}
          />
        ) : null;
      }

      return (
        <MarkerCluster
          key={`${numPoints}_${item.id}`}
          lat={lat}
          lng={lng}
          numPoints={numPoints}
          increaseZoomAndCenter={this._increaseZoomAndCenter}
        />
      );
    });
  };

  private _handleMapChange = (options: any) => {
    return this.setState(options, () => {
      this._handleClusters();
    });
  };

  private _fitBounds = () => {
    const { markers } = this.props;
    const { singleItemZoom } = defaultConfig;

    let state = {
      center: markers[0].location,
      zoom: singleItemZoom
    };

    if (markers.length > 1) {
      const bounds = new google.maps.LatLngBounds();

      markers.map(marker =>
        bounds.extend(new google.maps.LatLng(marker.location.lat, marker.location.lng))
      );

      const newBounds = {
        ne: {
          lat: bounds.getNorthEast().lat(),
          lng: bounds.getNorthEast().lng()
        },
        sw: {
          lat: bounds.getSouthWest().lat(),
          lng: bounds.getSouthWest().lng()
        }
      };

      const { size } = this.state;
      const { center, zoom } = fitBounds(newBounds, size);

      state = {
        center,
        zoom
      };
    }

    return (this.releaseFitBounds = setTimeout(() => this.setState(state), 200));
  };

  private _handleClusters() {
    const { bounds } = this.state;

    return this.setState({
      clusters: bounds
        ? this._getClusters().map(({ wx, wy, numPoints, points }: ICluster) => ({
            location: {
              lat: wy,
              lng: wx
            },
            numPoints,
            id: `${numPoints}_${points[0].lat}`,
            points
          }))
        : []
    });
  }

  private _getClusters() {
    const { center, zoom, bounds } = this.state;
    const { markers } = this.props;
    const { minZoom, maxZoom, radius } = defaultConfig.clusters;

    const clusters = supercluster(
      markers.map(({ id, location }) => ({
        ...location,
        id
      })),
      {
        minZoom,
        maxZoom,
        radius
      }
    );

    return clusters({
      bounds,
      center,
      zoom
    });
  }

  private _increaseZoomAndCenter = (center: ILocation) => {
    return this.setState(prevState => ({
      center,
      zoom: prevState.zoom + 1
    }));
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Actions>): IDispatchProps => {
  return {
    ...bindActionCreators(
      {
        markMapScriptAsLoaded
      },
      dispatch
    )
  };
};

export default compose<any>(connect(null, mapDispatchToProps))(Map);
