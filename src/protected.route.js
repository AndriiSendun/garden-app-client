import React from "react";
import { Route, Redirect } from "react-router-dom";
import routes from "./constants/routes";

import store from "./store";

export function ProtectedRouter({ protect, component: Component, ...rest }) {
  const protection = store.getState().authReducer.token;

  return (
    <Route
      {...rest}
      render={props => {
        if (protection) {
          return <Component {...props} />;
        } else {
          return <Redirect to={routes.landing} />;
        }
      }}
    />
  );
}

export function GuestRouter({ component: Component, ...rest }) {
  const protection = !store.getState().authReducer.token;

  return (
    <Route
      {...rest}
      render={props => {
        if (protection) {
          return <Component {...props} />;
        } else {
          return <Redirect to={routes.dashboard} />;
        }
      }}
    />
  );
}
