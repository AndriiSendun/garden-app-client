import React from "react";
import ReactTooltip from "react-tooltip";

const flowerInformation = props => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const dateAdded = new Date(props.dateAdded);
  const date = `${dateAdded.getDate()} ${
    months[dateAdded.getMonth()]
  }, ${dateAdded.getFullYear()}`;
  const dayCount = new Date() - props.dateAdded;

  return (
    <article className="flower-details__information">
      <h2 className="flower-details__information--title">Information</h2>
      <p className="flower-details__information__info">
        <span className="flower-details__information__info--type">
          Flower type:
        </span>
        {props.flowerType}
      </p>
      <p className="flower-details__information--created">
        <span className="flower-details__information__info--birth">
          Birthday:
        </span>
        {date}
        <span
          className="flower-details__information__info--totaldays"
          data-tip="Flower lifespan"
        >
          ({Math.floor(dayCount / 86400000)} days)
        </span>
      </p>
      <ReactTooltip />
    </article>
  );
};

export default flowerInformation;
