import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <>Loading</>,
      returnTo : '/login'
    })}
    {...args}
  />
);

export default ProtectedRoute;
