import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import ValidateFields from "../../../common/form-validation";

import AirHumidity from "./create-flower-form-fields/air-humidity.component";
import AirTemp from "./create-flower-form-fields/air-temperature.component";
import AmbientLight from "./create-flower-form-fields/ambient-light.component";
import FlowerName from "./create-flower-form-fields/flower-name.component";
import FlowerType from "./create-flower-form-fields/flower-type.component";
import SoilHumidity from "./create-flower-form-fields/soil-humidity.component";
import Delta from "./create-flower-form-fields/delta-params.component";
import Package from "./create-flower-form-fields/package.component";

import {
  Button,
  TYPES
} from "../../../common/components/button/button.component";

const {
  validate,
  RenderInput,
  RenderSelect,
  RenderRange,
  RenderSelectDefault
} = ValidateFields;

let createFlower = props => {
  const { handleSubmit, change } = props;
  const {
    airTemperature,
    airHumidity,
    light,
    soilHumidity,
    delta
  } = props.initialValues;

  return (
    <section className="create-flower">
      <form className="create-flower__form" onSubmit={handleSubmit}>
        <FlowerName validForm={RenderInput} />
        <FlowerType change={change} validForm={RenderSelect} />
        <AirHumidity defaultVal={airHumidity} validForm={RenderRange} />
        <AirTemp defaultVal={airTemperature} validForm={RenderRange} />
        <AmbientLight defaultVal={light} validForm={RenderRange} />
        <SoilHumidity defaultVal={soilHumidity} validForm={RenderRange} />
        <Delta defaultVal={delta} validForm={RenderRange} />
        <Package validForm={RenderSelectDefault} />
        <Button title={"SAVE"} type="submit" buttonType={TYPES.PRIMARY} />
      </form>
      {props.currentFlower !== null ? (
        <Button
          title={"DELETE"}
          type="text"
          buttonType={TYPES.DELETE}
          onClick={props.deleteFlower}
          customClass={"delete-flower"}
        />
      ) : null}
    </section>
  );
};

const mapStateToProps = (state, own) => {
  return {
    ...state.form,
    initialValues:
      own.currentFlower !== null && !state.flowerType.type.type
        ? own.currentFlower
        : state.flowerType.type,
    type: state.flowerType
  };
};

createFlower = reduxForm({
  form: "create-flower-form",
  enableReinitialize: true,
  validate
})(createFlower);

createFlower = connect(mapStateToProps)(createFlower);

export default createFlower;
