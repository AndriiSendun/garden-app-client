import React from "react";
import "./page-title.scss";

const pageTitle = props => {
  return <h1 className="page-title">{props.title}</h1>;
};

export default pageTitle;
