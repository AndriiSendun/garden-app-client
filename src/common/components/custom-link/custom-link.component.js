import React, { Component } from "react";

import "./custom-link.styles.scss";

class CustomLink extends Component {
  render() {
    return (
      <div
        className={`link ${this.props.additionalClass}`}
        onClick={this.props.onClick}
      >
        {this.props.title}
      </div>
    );
  }
}

export default CustomLink;
