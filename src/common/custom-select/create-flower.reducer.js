const initialState = {
  type: {
    airHumidity: 0,
    airTemperature: 0,
    light: 0,
    name: undefined,
    type: undefined,
    soilHumidity: 0
  }
};

const setType = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default setType;
