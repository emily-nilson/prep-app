import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScenarioSelect from './scenario-select/ScenarioSelect';
import DateRangeSelect from './date-range-select/DateRangeSelect';
import { CompareMap, ToggleMap, DifferenceMap } from './tool-map';
import LocationSearch from './location-search/LocationSearch';
import './style.scss';

// Redux
import { getSelectorsInfo } from 'actions/nexgddptool';

class NexGDDPTool extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mapView: props.mapView
    };
    this.switchMapView = this.switchMapView.bind(this);
  }

  componentDidMount() {
    this.props.getSelectorsInfo();
  }

  switchMapView(mapView) {
    return () => this.setState({ mapView });
  }

  render() {
    const { mapView } = this.state;

    return (
      <div className="c-nextgddp-tool">
        <div className="row">
          <div className="columns small-12 medium-4">
            <DateRangeSelect />
          </div>
          <div className="columns small-12 medium-4">
            <ScenarioSelect />
          </div>
        </div>
        <div className="row">
          <div className="columns small-12 medium-8">
            <button
              className={`c-button -inline ${mapView === 'difference' ? '-active' : ''}`}
              onClick={this.switchMapView('difference')}
            >Difference</button>
            <button
              className={`c-button -inline ${mapView === 'side-by-side' ? '-active' : ''}`}
              onClick={this.switchMapView('side-by-side')}
            >Side by side</button>
            <button
              className={`c-button -inline ${mapView === 'toggle' ? '-active' : ''}`}
              onClick={this.switchMapView('toggle')}
            >Toggle</button>
          </div>
          <div className="columns small-12 medium-4">
            <LocationSearch />
          </div>
        </div>
        <div className="row">
          <div className="columns small-12">
            {mapView === 'difference' && <DifferenceMap />}
            {mapView === 'side-by-side' && <CompareMap />}
            {mapView === 'toggle' && <ToggleMap />}
          </div>
        </div>
      </div>
    );
  }
}

NexGDDPTool.propTypes = {
  getSelectorsInfo: PropTypes.func,
  mapView: PropTypes.oneOf(['difference', 'side-by-side', 'toggle'])
};

NexGDDPTool.defaultProps = {
  mapView: 'difference'
};

const mapDispatchToProps = dispatch => ({
  getSelectorsInfo: () => dispatch(getSelectorsInfo())
});

export default connect(null, mapDispatchToProps)(NexGDDPTool);
