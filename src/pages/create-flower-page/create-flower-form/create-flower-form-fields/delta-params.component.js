import React from "react";
import { Field } from "redux-form";

const delta = props => {
  return (
    <Field
      description="Allowed deviation from initial plant settings"
      step={1}
      minValue={0}
      maxValue={100}
      unit="%"
      label="Margin of error"
      id="error-margin"
      name="delta"
      className="form__controls--select"
      defaultVal={props.defaultVal}
      tooltip={"Recommended margin of error for this type of flower"}
      component={props.validForm}
    />
  );
};
export default delta;
