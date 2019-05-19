import React from "react";

import inputsRenderer from "../inputs-renderer.component";

import "./select-default.styles.scss";

const selectDefault = inputsRenderer(
  (name, input, touched, error, label, id, className, options) => {
    return (
      <div className="form__controls">
        <select
          {...name}
          {...input}
          disabled={options.disabled}
          label={label}
          className={className}
          id={id}
        >
          {options.children}
        </select>
      </div>
    );
  }
);

export default selectDefault;
