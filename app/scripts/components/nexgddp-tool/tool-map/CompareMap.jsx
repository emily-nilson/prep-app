import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import 'lib/leaflet-side-by-side';

// Redux
import { getLayers } from 'selectors/nexgddptool';
import { setMarkerPosition } from 'actions/nexgddptool';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 10,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class CompareMap extends React.PureComponent {
  componentDidMount() {
    const { layers } = this.props;
    const map = this.mapElement.leafletElement;
    const leftLayer = L.tileLayer(layers[0].url, {
      maxZoom: 10,
      minZoom: 3
    });

    const rightLayer = L.tileLayer(layers[1].url, {
      minZoom: 3,
      maxZoom: 10
    });

    window.requestAnimationFrame(() => {
      leftLayer.addTo(map);
      rightLayer.addTo(map);
      L.control.sideBySide(leftLayer, rightLayer).addTo(map);
      map.invalidateSize();
    });
  }

  render() {
    const { marker, range1Selection, range2Selection } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: marker || mapDefaultOptions.center
    });

    return (
      <div className="c-tool-map">
        <div
          className="current-layer-label"
        >{range1Selection.label}</div>
        <div
          className="current-layer-label -right"
        >{range2Selection.label}</div>
        <Map
          ref={el => (this.mapElement = el)}
          style={{ height: 440 }}
          {...mapOptions}
          onClick={({ latlng }) => this.props.setMarkerPosition([latlng.lat, latlng.lng])}
        >
          <TileLayer
            url={config.basemapTileUrl}
          />
          <ZoomControl position="bottomright" />
          { marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }
        </Map>
      </div>
    );
  }
}

CompareMap.propTypes = {
  layers: PropTypes.array,
  marker: PropTypes.array,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  setMarkerPosition: PropTypes.func
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker,
  layers: getLayers(state),
  range1Selection: state.nexgddptool.range1.selection,
  range2Selection: state.nexgddptool.range2.selection
});

const mapDispatchToProps = dispatch => ({
  setMarkerPosition: (...params) => dispatch(setMarkerPosition(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompareMap);