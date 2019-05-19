export const setType = data => dispatch => {
  dispatch({ type: "SET_TYPE", payload: data });
};
export const resetState = () => dispatch => {
  dispatch({ type: "RESET" });
};
