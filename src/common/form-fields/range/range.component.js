import React from "react";

import Range from "react-input-range";
import ReactTooltip from "react-tooltip";

import "react-input-range/lib/css/index.css";
import "./range.styles.scss";

import inputsRenderer from "../inputs-renderer.component";

const range = inputsRenderer(
  (input, touched, error, label, id, name, className, description) => {
    const val = input.value === "" ? (input.value = 0) : input.value;
    return (
      <div id={id} className="form__controls">
        <Range
          name={name}
          className={className}
          label={label}
          description={description}
          value={val}
          formatLabel={value => {
            const tooltip = (
              <span className="tooltip">
                {value}
                <span className="tooltip__unit">{description.unit}</span>
              </span>
            );
            return tooltip;
          }}
          defaultVal={description.defaultVal}
          tooltip={description.tooltip}
          maxValue={description.maxValue}
          minValue={description.minValue}
          step={description.step}
          onBlur={input.onBlur}
          onChange={input.onChange}
          onDragStart={input.onDragStart}
          onDrop={input.onDrop}
          onFocus={input.onFocus}
        />
        <div className="default-val">
          <span
            data-tip={description.tooltip}
            className="default-val__grab"
            style={{ left: `${description.defaultVal}%` }}
          />
        </div>
        <ReactTooltip effect="float" place="bottom" />
      </div>
    );
  }
);

export default range;
