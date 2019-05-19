import React from "react";

import "./input.styles.scss";

const inputClassApply = (touched, error) => {
  const inputClass =
    touched && error
      ? "form-control__input form-control__input--error"
      : "form-control__input";

  return inputClass;
};

const Input = ({
  placeholder,
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <div className="form-control">
    <label className="form-control__label">{label}</label>
    <div>
      <input
        className={inputClassApply(touched, error)}
        {...input}
        placeholder={placeholder}
        type={type}
      />
      {touched &&
        (error && <span className="form-control__error">{error}</span>)}
    </div>
  </div>
);

export default Input;
