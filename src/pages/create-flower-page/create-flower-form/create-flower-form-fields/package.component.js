import React, { Component } from "react";
import { Field } from "redux-form";
import { connect } from "react-redux";

import { fetchSensors } from "../../../../common/sensors/sensors.middleware";

class Package extends Component {
  constructor(props) {
    super(props);
    this.activeSensors = [];
  }
  componentDidMount() {
    this.props.fetchSensors();
  }

  validate = sensors => {
    return sensors.sensorErr || sensors.socketErr ? false : true;
  };

  validateSensors = sensors => {
    if (this.validate(sensors)) {
      return sensors.every(
        sensor =>
          Object.entries(sensor).length !== 0 && sensor.constructor === Object
      );
    }
  };

  shouldComponentUpdate() {
    if (this.validateSensors(this.props.sensors)) {
      this.activeSensors.length = 0;
      for (let sensor of this.props.sensors) {
        this.activeSensors.push(sensor);
      }

      return true;
    }

    return false;
  }

  render() {
    return (
      <Field
        id="package"
        name="package_id"
        label="Select sensor"
        className="form__constrols--sensor"
        description={"Select sensors you have attached to your flower"}
        disabled={!this.validate(this.props.sensors) ? true : false}
        component={this.props.validForm}
      >
        {this.validate(this.props.sensors) && this.activeSensors.length ? (
          this.activeSensors.map(sensor => {
            return (
              <option
                key={sensor.pack.name}
                value={sensor.pack.package_id}
                className="sensor"
              >
                {sensor.pack.name}
              </option>
            );
          })
        ) : (
          <option className="no-sensor" key={"no-sensor"} value="">
            No sensors
          </option>
        )}
      </Field>
    );
  }
}

const mapStateToProps = state => {
  return state.sensors;
};

export default connect(
  mapStateToProps,
  { fetchSensors }
)(Package);
