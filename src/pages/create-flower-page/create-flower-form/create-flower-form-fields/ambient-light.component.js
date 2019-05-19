import React from "react";
import { Field } from "redux-form";

const ambientLight = props => {
  return (
    <Field
      description="Optimal level of ambient light of the environment"
      step={1}
      minValue={0}
      maxValue={100}
      defaultVal={props.defaultVal}
      tooltip={"Recommended light for this type of flower"}
      unit="lux"
      id="light"
      name="light"
      label="Amount of light"
      component={props.validForm}
    />
  );
};

export default ambientLight;
