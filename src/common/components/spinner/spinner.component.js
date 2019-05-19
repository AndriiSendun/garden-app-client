import React, { Component } from "react";

import "./spinner.styles.scss";

class Spinner extends Component {
  render() {
    return (
      <div className="spin-wrapper">
        <div className="spinner" />
      </div>
    );
  }
}

export default Spinner;
