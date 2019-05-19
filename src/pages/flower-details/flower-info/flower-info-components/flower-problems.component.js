import React from "react";

const flowerPrimary = props => {
  return (
    <article className="flower-details__problems">
      <h2 className="flower-details__problems--title">Problems</h2>
      <ul className="flower-details__problems--list">
        {props.isNeedy !== undefined && props.isNeedy.length ? (
          props.isNeedy.map(problem => (
            <li key={problem} className="problem">
              {problem}
            </li>
          ))
        ) : (
          <li className="problem">
            {!props.isConnected
              ? "Please, connect your flower to external sensor!"
              : "The flower is well taken care of!"}
          </li>
        )}
      </ul>
    </article>
  );
};

export default flowerPrimary;
