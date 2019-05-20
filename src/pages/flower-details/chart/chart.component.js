import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { ChartModel } from "./chart.model";
import { getDaySensorData } from "./chart.action";

import NoDataChart from "./no-data-chart.component";

import "./chart.styles.scss";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.chart = new ChartModel();
  }

  fetchData(
    id = this.props.package_id,
    fieldType = this.props.selector,
    time = moment()
      .startOf("day")
      .valueOf() - 86400000
  ) {
    this.props.getDaySensorData(this.props.package_id, fieldType, time).then(array => {
      if (array.length) {
        this.chart.init({
          selector: this.props.selector,
          data: array
        });
        this.chart.draw();
        this.chart.addArea(array);
        this.chart.toolTip(array);
      } else {
        return false;
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  pickDate() {
    const time = moment(this.datepicker.value).valueOf();
    const id = this.props.package_id;
    this.chart.clear();
    this.fetchData(id, this.props.selector, time);
  }

  render() {
    return (
      <>
        <div className={`${this.props.selector}-chart`}>
          <h2 className={`${this.props.selector}-chart__title`}>
            {this.props.title}
          </h2>

          <input
            ref={node => (this.datepicker = node)}
            type="date"
            name="date"
            id="date"
            className="chart-input"
            placeholder="dd/mm/yyyy"
            onChange={this.pickDate.bind(this)}
          />
          <div className="svg-box">
            {this.props[this.props.selector].length ? (
              <svg className={`${this.props.selector}-chart__container`} />
            ) : (
              <NoDataChart selector={this.props.selector} />
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  sensors: state,
  water: state.chartReducer.water,
  air: state.chartReducer.air,
  temperature: state.chartReducer.temperature
});

export default connect(
  mapStateToProps,
  { getDaySensorData }
)(Chart);
