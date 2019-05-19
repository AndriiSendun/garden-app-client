import React from "react";

import DetailsMain from "./flower-info-components/flower-primary.component";
import FlowerInformation from "./flower-info-components/flower-information.component";
import Ranges from "./flower-info-components/flower-ranges.component";
import Problems from "./flower-info-components/flower-problems.component";
import Chart from "../chart/chart.component";

const flowerInfo = props => {
  return (
    <section className="flower-details">
      <DetailsMain
        name={props.flowerName}
        thumbnail={props.thumb}
        isConnected={props.connected}
        isNeedy={props.issues}
      />
      <FlowerInformation flowerType={props.type} dateAdded={props.created_at} />
      <Ranges
        soilMoisture={props.soil}
        temp={props.temperature}
        airHumidity={props.humidity}
        amblight={props.light}
      />
      <Problems isNeedy={props.issues} isConnected={props.connected} />
      <Chart
        selector="water"
        title="Water chart"
        package_id={props.package_id}
      />
      <Chart
        selector="temperature"
        title="Temperature chart"
        package_id={props.package_id}
      />
      <Chart selector="air" title="Air chart" package_id={props.package_id} />
    </section>
  );
};

export default flowerInfo;
