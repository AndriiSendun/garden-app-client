import React from "react";

import inputsRenderer from "../inputs-renderer.component";

const inputClassApply = (touched, error) => {
  const inputClass =
    touched && error
      ? "form-control__input form-control__input--error"
      : "form-control__input";

  return inputClass;
};

const input = inputsRenderer(
  (input, touched, error, label, id, name, className, description) => {
    return (
      <div className="form__controls">
        <input
          id={id}
          className={inputClassApply(touched, error)}
          {...input}
          description={description}
          name={name}
          type="text"
          placeholder={label}
        />
      </div>
    );
  }
);

export default input;
