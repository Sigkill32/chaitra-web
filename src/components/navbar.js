import React from "react";
import { NavLink } from "react-router-dom";
import { textGradient } from "./../utils";
import cm from "../images/cm.svg";

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={cm} alt="logo" />
      </div>
      <div className="nav-links">
        <div>
          <NavLink activeStyle={textGradient} to="/home">
            home
          </NavLink>
        </div>
        <div>
          <NavLink activeStyle={textGradient} to="/experiments">
            experiments
          </NavLink>
        </div>
        <div>
          <NavLink activeStyle={textGradient} to="/about">
            about
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
