import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import ReactTooltip from "react-tooltip";

import routes from "./../../constants/routes";
import "./flower-thumbnail.scss";

function FlowerThumbnail(props) {
  const redirect = () => props.push(routes.flowerDetails, { flower: props.id });
  return (
    <div className="thumbnail">
      <div className="thumbnail--flower">
        <div className="title">
          <h2 className="title__name">{props.name}</h2>
          {props.disconnected ? (
            <>
              <i
                className="title__icon--disconnect material-icons"
                data-tip="Connection with sensor not established"
              >
                error
              </i>
            </>
          ) : null}
          {props.issues ? (
            <>
              <i
                className="title__icon--issue issues material-icons"
                data-tip="Flower has some issues. Click on details for more info!"
              >
                warning
              </i>
            </>
          ) : null}
        </div>
        <p className="thumbnail__type">{props.type}</p>
      </div>
      <div className="plant--info">
        <div className="plant">
          <img
            className="plant__avatar"
            src={require(`../../assets/${props.picture}`)}
            alt="plant"
          />
        </div>
        <div className="ranges">
          <span className="ranges__title">Soil moisture</span>
          <div className="range range--soil">
            <div
              data-tip="Current soil moisture of your plant"
              className="range--soil__fill range--fill"
              style={{ width: `${props.soilMoisture}%` }}
            />
            <span className="percentage">{props.soilMoisture}%</span>
          </div>
          <span className="ranges__title">Air humidity</span>
          <div className="range range--humidity">
            <div
              data-tip="Plant environment humidity level"
              className="range--humidity__fill range--fill"
              style={{ width: `${props.airHumidity}%` }}
            />
            <span className="percentage">{props.airHumidity}%</span>
          </div>
          <span className="ranges__title">Air temperature</span>
          <div className="range range--temperature">
            <div
              data-tip="Plant environment air temperature"
              className="range--temperature__fill range--fill"
              style={{ width: `${props.airTemperature}%` }}
            />
            <span className="percentage">{props.airTemperature}%</span>
          </div>
          <span className="ranges__title">Ambient light</span>
          <div className="range range--light">
            <div
              data-tip="Current amount of ambient light"
              className="range--light__fill range--fill"
              style={{ width: `${props.ambientLight}%` }}
            />
            <span className="percentage">{props.ambientLight}%</span>
          </div>
        </div>
      </div>
      <div className="details" onClick={() => redirect()}>
        View details
      </div>
      <ReactTooltip />
    </div>
  );
}

export default connect(
  null,
  { push }
)(FlowerThumbnail);
