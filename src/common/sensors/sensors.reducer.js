const initialState = {
  sensors: [{}, {}, {}, {}]
};
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MAIN":
      let newState = initialState;
      return {
        ...state,
        sensors: action.payload.sensorErr
          ? action.payload
          : newState.sensors.map((pack, i) =>
              i === 0 ? { ...pack, pack: action.payload } : pack
            )
      };
    case "GET_SOUTH":
      return {
        ...state,
        sensors: state.sensors.map((pack, i) =>
          i === 1 ? { ...pack, pack: action.payload } : pack
        )
      };
    case "GET_WEST":
      return {
        ...state,
        sensors: state.sensors.map((pack, i) =>
          i === 2 ? { ...pack, pack: action.payload } : pack
        )
      };
    case "GET_EAST":
      return {
        ...state,
        sensors: state.sensors.map((pack, i) =>
          i === 3 ? { ...pack, pack: action.payload } : pack
        )
      };
    case "SOCKET_ERR":
      return {
        ...state,
        sensors: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
