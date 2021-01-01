import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from "dotenv";
import App from "./App";

dotenv.config();

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
ReactDom.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
