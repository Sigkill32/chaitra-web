import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { textGradient } from "./../utils";
import cm from "../images/cm.svg";
import bars from "../images/bars.svg";
import close from "../images/close.svg";

class NavBar extends Component {
  state = {
    isExpanded: false,
  };

  handleExpand = () => {
    this.setState({ isExpanded: true });
  };

  handleClose = () => {
    this.setState({ isExpanded: false });
  };

  render() {
    const { isExpanded } = this.state;
    return (
      <div className="navbar">
        <div className="nav-logo">
          <img src={cm} alt="logo" />
        </div>
        <div className={!isExpanded ? "nav-links" : "expanded-burger"}>
          <button onClick={this.handleClose} className="nav-close">
            <img src={close} alt="close" />
          </button>
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
            <NavLink
              activeStyle={textGradient}
              to="/about"
              style={{ margin: 0 }}
            >
              about
            </NavLink>
          </div>
        </div>
        <div className="burger-button">
          <button onClick={this.handleExpand}>
            <img src={bars} alt="burger menu" />
          </button>
        </div>
      </div>
    );
  }
}

export default NavBar;
