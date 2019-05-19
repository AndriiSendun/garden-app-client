import React from "react";
import { Field } from "redux-form";

const soilHumidity = props => {
  return (
    <Field
      description="Relative humidity of soil moisture"
      step={1}
      minValue={0}
      maxValue={100}
      defaultVal={props.defaultVal}
      tooltip={"Recommended soil moisture for this type of flower"}
      unit="RH"
      id="soilHumidity"
      name="soilHumidity"
      label="Soil humidity"
      component={props.validForm}
    />
  );
};

export default soilHumidity;
