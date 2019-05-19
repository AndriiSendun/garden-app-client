import React from "react";

import inputsRenderer from "../inputs-renderer.component";

import CustomSelect from "../../custom-select/custom-select.component";

import "./custom-select.styles.scss";

const select = inputsRenderer(
  (name, input, touched, error, label, id, className, options) => {
    return (
      <div className="form__controls">
        <CustomSelect
          label={label}
          id={id}
          {...name}
          className={className}
          {...options}
        />
      </div>
    );
  }
);

export default select;
