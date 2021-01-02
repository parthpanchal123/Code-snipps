import React from "react";
import { Container, Button } from "react-bootstrap";
import Programmer from "../../assets/programmer.gif";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";

const Login = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  console.log(user, isAuthenticated);

  return !user ? (
    <>
      <Container
        className="text-center mt-5"
        // style={{ width: "100vh" }}
      >
        <img src={Programmer} alt={"Programmer"} style={{ width: "40%" }} />

        <h3 className="mt-5 mb-4 sm">
          {" "}
          Share your favorite code snippets 😄 with all other fellow developers
          😎{" "}
        </h3>

        <Button
          variant="outline-dark "
          onClick={() => loginWithRedirect()}
          className="shadow p-2 mb-5 rounded"
        >
          Get Started !
        </Button>
      </Container>
      <footer
        style={{
          bottom: "0",
          position: "fixed",
          width: "100%",
        }}
        className="text-center"
      >
        <h6 style={{ fontStyle: "italic" }}>
          {" "}
          <u>{"Made with ❤️ and lots of </> by Parth"}</u>
        </h6>
      </footer>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
