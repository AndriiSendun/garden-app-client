import {
  SUCCESS_GET_DAY_SENSOR_DATA,
  FAIL_GET_DAY_SENSOR_DATA
} from "./chart.action-types";

const initialState = {
  water: [],
  air: [],
  temperature: [],
  message: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_GET_DAY_SENSOR_DATA:
      if (action.payload.dataType === "water") {
        return {
          ...state,
          water: action.payload.data
        };
      } else if (action.payload.dataType === "temperature") {
        return {
          ...state,
          temperature: action.payload.data
        };
      } else if (action.payload.dataType === "air") {
        return {
          ...state,
          air: action.payload.data
        };
      }
      break;
    case FAIL_GET_DAY_SENSOR_DATA:
      return {
        ...state,
        sensorData: null,
        message: action.payload
      };
    default:
      return state;
  }
}
