import React from "react";

import "./button.styles.scss";

export const TYPES = {
  PRIMARY: "btn--primary",
  SECONDARY: "btn--secondary",
  DELETE: "btn--delete",
  EDIT: "btn--edit"
};

export const Button = ({
  title,
  buttonType,
  onClick,
  disabled,
  type,
  customClass
}) => (
  <button
    type={type}
    className={`${buttonType} btn ${
      customClass === undefined ? "" : customClass
    }`}
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
