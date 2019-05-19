import React from "react";
import ReactTooltip from "react-tooltip";

const flowerPrimary = props => {
  return (
    <article className="flower-details__main">
      <h2 className="flower-details__name">
        {props.name}
        <i
          data-tip="Please, check problems area for more details"
          className="flower-details__main--issue material-icons"
        >
          {props.isNeedy !== undefined && props.isNeedy.length
            ? "warning"
            : null}
        </i>
      </h2>

      <p className="flower-details__main--connection-status">
        {!props.isConnected ? (
          <>
            <i
              data-tip="Connection with sensor not established"
              className="material-icons"
            >
              warning
            </i>
            <span className="notconnected-message">
              There is no connection to the flower sensor!
            </span>
          </>
        ) : null}
      </p>
      <figure className="flower-details__main--thumbnail">
        <img
          className="thumb"
          src={require(`../../../../assets/${props.thumbnail}`)}
          alt=""
        />
      </figure>
      <ReactTooltip />
    </article>
  );
};

export default flowerPrimary;
