import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { Button, TYPES } from "../components/button/button.component";

import "./confirm-popup.styles.scss";

class ConfirmPopup extends Component {
  removeItem = () => {
    this.props.confirmRemove();
    closePopup();
  };

  rejectRemove = () => {
    closePopup();
  };

  render() {
    return (
      <div className="confirm-modal">
        <p className="confirm-modal__title">{this.props.title}</p>
        <h3 className="confirm-modal__flower-name">{this.props.item} ?</h3>
        <div className="confirm-modal__btns">
          <Button
            type="text"
            buttonType={TYPES.DELETE}
            customClass="confirm-remove"
            title={"Yes"}
            onClick={this.removeItem}
          />
          <Button
            type="text"
            buttonType={TYPES.PRIMARY}
            customClass="reject-remove"
            title={"No"}
            onClick={this.rejectRemove}
          />
        </div>
      </div>
    );
  }
}

const getPopup = properties => {
  const root = document.querySelector("#root");
  const targetDiv = document.createElement("div");
  targetDiv.className = "confirm";
  targetDiv.addEventListener("click", e => {
    if (e.target.className === "confirm") {
      closePopup();
    }
  });
  root.appendChild(targetDiv);
  render(<ConfirmPopup {...properties} />, targetDiv);
};

const closePopup = () => {
  unmountComponentAtNode(document.querySelector(".confirm"));
  document.querySelector(".confirm").remove();
};

export function confirm(properties) {
  getPopup(properties);
}
