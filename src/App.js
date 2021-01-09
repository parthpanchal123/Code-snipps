import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Posts from "./components/Posts";
import FormComponent from "./components/Form";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { Route, Switch } from "react-router-dom";

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
}

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Posts} />
        <ProtectedRoute exact path="/addNewMemory" component={FormComponent} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
