import React, { Component } from "react";
import "./custom-select.styles.scss";

import { connect } from "react-redux";

import flowers from "../../constants/flowers";

import { setType } from "./create-flower.action";

class CustomSelect extends Component {
  state = { selectActive: false };

  closeOverlay = () => this.setState({ selectActive: false });
  openOverlay = () => this.setState({ selectActive: true });

  selectValueHandler = value => () => {
    const [option] = flowers.filter(flower => flower.name === value);

    const defaults = {
      name: this.props.form["create-flower-form"].values.name,
      type: value,
      airTemperature: parseInt(option.defaultAirTemp),
      airHumidity: parseInt(option.defaultAirHumidity),
      light: parseInt(option.defaultLux),
      soilHumidity: parseInt(option.defaultSoilHumidity),
      delta: parseInt(option.delta)
    };

    this.props.setType(defaults);
    this.setValue(value);
    this.closeOverlay();
  };

  renderSelectedHandler = () => {
    const { options, value } = this.props;
    const found = options.find(option => option.name === value);
    return found ? (
      found.name
    ) : (
      <span className="custom-select__value--placeholder">
        Select flower type
      </span>
    );
  };

  renderOptionsHandler = () => {
    return this.props.options.map(option => {
      const { id, name, flower_img, alt } = option;

      return (
        <article
          className="custom-select__options--option"
          key={id}
          onClick={this.selectValueHandler(name)}
        >
          <p className="title">{name}</p>
          <div className="custom-select__options--image">
            <img
              className="flower-image"
              src={require(`../../assets/${flower_img}`)}
              alt={alt}
            />
          </div>
        </article>
      );
    });
  };

  setValue = value => {
    this.props.setFieldValue(this.props.name, value);
  };

  render() {
    const { selectActive } = this.state;
    return (
      <div
        tabIndex={1}
        className={`custom-select ${selectActive ? "open" : "closed"}`}
      >
        <div className="custom-select__field">
          <div
            className="custom-select__value"
            onClick={selectActive ? this.closeOverlay : this.openOverlay}
          >
            {this.renderSelectedHandler()}
            <span className="custom-select__value--arrow">
              {selectActive ? "▴" : "▾"}
            </span>
          </div>
        </div>
        {selectActive ? (
          <div className="custom-select__options">
            {this.renderOptionsHandler()}
          </div>
        ) : null}
        {selectActive ? (
          <div className="overlay" onClick={this.closeOverlay} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(
  mapStateToProps,
  { setType }
)(CustomSelect);
