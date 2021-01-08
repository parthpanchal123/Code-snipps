import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../index.css";
import { PencilFill, BoxArrowRight, List } from "react-bootstrap-icons";
import Fade from "react-reveal/Fade";
import code from "../assets/code.png";

export const NavBar = () => {
  const [collapsed, setCollapsed] = useState("false");
  const { logout, isAuthenticated } = useAuth0();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <img
          src={code}
          alt="Logo"
          width="30 "
          height="30"
          className="d-inline-block align-bottom"
        />

        <Link className="navbar-brand ml-2" to="/">
          Code-snipps
        </Link>
        {isAuthenticated ? (
          <>
            <button
              className="navbar-toggler"
              id="menu_button"
              type="button"
              aria-controls={"navbarSupportedContent"}
              aria-label={"Toggle navigation"}
              style={{ margin: "0" }}
              onClick={() => setCollapsed(!collapsed)}
            >
              <span>
                <List />
              </span>
            </button>
            <Fade>
              <div
                className={`collapse navbar-collapse  ${
                  collapsed ? "hide" : "show"
                }`}
                id={"navbarSupportedContent"}
              >
                <Nav className="ml-auto mt-2 " id={"mobileNav"}>
                  <Link
                    className="nav-link"
                    to="/addNewMemory"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    Create a Code-snipp
                    <PencilFill className="ml-2" />
                  </Link>

                  <Link
                    className="nav-link "
                    to="/login"
                    onClick={() => logout()}
                  >
                    LogOut
                    <BoxArrowRight className="ml-2" />
                  </Link>
                </Nav>
              </div>
            </Fade>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
