import React from "react";
import { Container, Button } from "react-bootstrap";
import Programmer from "../../assets/programmer.gif";
import { useAuth0 } from "@auth0/auth0-react";
import Zoom from "react-reveal/Zoom";
import { Redirect } from "react-router";
import StepperComponent from "../../components/Stepper";
import "../../index.css";

const Login = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  console.log(user, isAuthenticated);

  return !user ? (
    <>
      <Container
        className="text-center mt-4"
        id={"fade-in"}
        // style={{ height: "100vh" }}
      >
        <Zoom>
          <img src={Programmer} alt={"Programmer"} style={{ width: "40%" }} />
        </Zoom>
        <h3 className="mt-5 mb-4 sm">
          {" "}
          Share your favorite code snippets 😄 with all other fellow developers
          😎{" "}
        </h3>

        <Button
          variant="outline-dark "
          onClick={() => {
            loginWithRedirect({
              screen_hint: "signup",
            });
          }}
          className="shadow p-2 mb-4 rounded"
        >
          Get Started !
        </Button>

        <h6 className="mb-4"><i>How it works ?</i></h6>
        <StepperComponent />
      </Container>

      <small
        className="text-center mb-2 mt-4"
        style={{
          bottom: "0px",
          width: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <u>{"Made with ❤️ and </> by Parth"}</u>
        <a
          href="https://github.com/parthpanchal123"
          target="_blank"
          rel="noreferrer"
          className="i text-primary ml-2"
        >
          Say Hello 👋!
        </a>
      </small>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
