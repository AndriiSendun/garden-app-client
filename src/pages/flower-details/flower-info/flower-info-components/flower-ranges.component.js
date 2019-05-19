import React from "react";
import ReactTooltip from "react-tooltip";

const flowerInformation = props => {
  return (
    <article className="flower-details__scales">
      <h2 className="flower-details__scales--title">Heartrate</h2>
      <div className="scales">
        <span className="scales__tooltip">Soil moisture</span>
        <div className="scales__scales-block">
          <div
            data-tip="Current soil moisture of your plant"
            className="scales__scales-block--soil"
            style={{ width: `${props.soilMoisture}%` }}
          />
          <span className="scales__scales-block--value">
            {props.soilMoisture}%
          </span>
        </div>
        <span className="scales__tooltip">Air humidity</span>
        <div className="scales__scales-block">
          <div
            data-tip="Plant environment humidity level"
            className="scales__scales-block--airhumidity"
            style={{ width: `${props.airHumidity}%` }}
          />
          <span className="scales__scales-block--value">
            {props.airHumidity}%
          </span>
        </div>
        <span className="scales__tooltip">Air temperature</span>
        <div className="scales__scales-block">
          <div
            data-tip="Plant environment air temperature"
            className="scales__scales-block--temperature"
            style={{ width: `${props.temp}%` }}
          />
          <span className="scales__scales-block--value"> {props.temp}%</span>
        </div>
        <span className="scales__tooltip">Ambient light</span>
        <div className="scales__scales-block">
          <div
            data-tip="Current amount of ambient light"
            className="scales__scales-block--light"
            style={{ width: `${props.amblight}%` }}
          />
          <span className="scales__scales-block--value">{props.amblight}%</span>
        </div>
      </div>
      <ReactTooltip />
    </article>
  );
};

export default flowerInformation;
