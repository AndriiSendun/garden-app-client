import React from "react";
import { Field } from "redux-form";

import flowers from "../../../../constants/flowers";

const flowerType = props => {
  return (
    <Field
      label="Flower type"
      id="flower-select"
      name="type"
      className="form__controls--select"
      component={props.validForm}
      options={flowers}
      setFieldValue={props.change}
    />
  );
};
export default flowerType;
