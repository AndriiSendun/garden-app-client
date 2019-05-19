import React from "react";
import { Field } from "redux-form";

const flowerName = props => {
  return (
    <Field
      id="Alias"
      name="name"
      label="Alias"
      description={"Pick any name you like for your flower"}
      component={props.validForm}
    />
  );
};

export default flowerName;
