import React from "react";

import "./chart.styles.scss";

function NoDataChart(props) {
  return (
    <div className={`error-chart error-chart--${props.selector}`}>
      <h2 className="error-chart__title">
        <i className="material-icons material-icons--warning">warning</i>
        <span>There is no statistic about flower on this day</span>
      </h2>
    </div>
  );
}

export default NoDataChart;
