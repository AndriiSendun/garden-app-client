import React from "react";
import { Field } from "redux-form";

const airHumidity = props => {
  return (
    <Field
      description="Relative humidity of the environment your flower resides in"
      step={1}
      minValue={0}
      maxValue={100}
      defaultVal={props.defaultVal}
      tooltip={"Recommended relative humidity for this type of flower"}
      unit="RH"
      id="airHumidity"
      name="airHumidity"
      label="Air humidity"
      component={props.validForm}
    />
  );
};

export default airHumidity;
