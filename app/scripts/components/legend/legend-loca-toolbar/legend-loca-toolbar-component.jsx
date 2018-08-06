import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import '../legend-nexgddp-toolbar/legend-nexgddp-toolbar-style.scss';

class LegendLOCAToolbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      temporalResolution: null,
      temporalResolutionOptions: null,
      period: null,
      periodsOptions: null,
      scenario: null,
      scenariosOptions: null
    };

    this.updatingPeriods = this.updatingPeriods.bind(this);
    this.onResolutionChange = this.onResolutionChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onScenarioChange = this.onScenarioChange.bind(this);
  }

  componentDidMount() {
    const { layerSpec } = this.props;
    const { layerConfig } = layerSpec;
    const { indicator } = layerConfig;
    const url = `${config.apiUrlRW}/loca/info/${indicator}`;

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response);
      })
      .then(json => this.updatingCombos(json))
      .catch(error => console.error(error));
  }

  onResolutionChange(temporalResolution) {
    this.setState({ temporalResolution }, () => {
      this.updatingPeriods();
      this.props.onMultiLayer({ ...this.state, id: this.props.layerSpec.dataset });
    });
  }

  onPeriodChange(period) {
    this.setState({ period }, () => {
      this.props.onMultiLayer({ ...this.state, id: this.props.layerSpec.dataset });
    });
  }

  onScenarioChange(scenario) {
    this.setState({ scenario }, () => {
      this.props.onMultiLayer({ ...this.state, id: this.props.layerSpec.dataset });
    });
  }

  updatingPeriods() {
    const { period: propPeriod } = this.props.layerSpec;
    const temporalResolution = this.state.temporalResolutionOptions.find(t => t.value === this.state.temporalResolution.value);
    const periodsOptions = temporalResolution.periods.map(p => ({ label: p.label, value: p.id }));
    const period = periodsOptions.find(s => s.value === (propPeriod || {}).label) || periodsOptions[0];

    this.setState({
      period,
      periodsOptions
    });
  }

  updatingCombos(data) {
    const {
      temp_resolution: propTemporalSolution,
      scenario: propScenarioSolution
    } = this.props.layerSpec;

    // Temporal resolution (decadal, 30 years)
    const temporalResolutionOptions = data.temporalResolution.map(t => ({ label: t.label, value: t.id, periods: t.periods }));
    const temporalResolution = temporalResolutionOptions.find(t => t.value === propTemporalSolution) || temporalResolutionOptions[0];

    // Scenarios
    const scenariosOptions = data.scenarios.map(s => ({ label: s.label, value: s.id }));
    const scenario = scenariosOptions.find(s => s.value === propScenarioSolution) || scenariosOptions[0];

    this.setState({
      temporalResolution,
      temporalResolutionOptions,
      scenario,
      scenariosOptions
    }, this.updatingPeriods);
  }

  render() {
    const {
      temporalResolution,
      temporalResolutionOptions,
      period,
      periodsOptions,
      scenario,
      scenariosOptions
    } = this.state;

    return (
      <div className="c-legend-nexgddp-toolbar">
        {temporalResolutionOptions && (
          <Select
            name="temporal_resolution"
            value={temporalResolution}
            options={temporalResolutionOptions}
            onChange={this.onResolutionChange}
            menuPosition="fixed"
            className="c-toolbar-select"
            classNamePrefix="react-select"
          />
        )}
        {periodsOptions && (
          <Select
            name="periods"
            value={period}
            options={periodsOptions}
            onChange={this.onPeriodChange}
            menuPosition="fixed"
            className="c-toolbar-select"
            classNamePrefix="react-select"
          />
        )}
        {scenariosOptions && (
          <Select
            name="scenario"
            value={scenario}
            options={scenariosOptions}
            onChange={this.onScenarioChange}
            menuPosition="fixed"
            className="c-toolbar-select"
            classNamePrefix="react-select"
          />
        )}
      </div>
    );
  }
}

LegendLOCAToolbar.propTypes = {
  layerSpec: PropTypes.object,
  onMultiLayer: PropTypes.func
};

export default LegendLOCAToolbar;
