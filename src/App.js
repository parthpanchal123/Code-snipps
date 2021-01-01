import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Posts from "./components/Posts";
import FormComponent from "./components/Form";
import Login from "./components/Auth/Login";
import { getPosts } from "./redux/actions/posts";
import { Route, Switch } from "react-router-dom";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/addNewMemory" component={FormComponent} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
