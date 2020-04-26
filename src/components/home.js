import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import NavBar from "./navbar";

const styles = {
  root: {
    flex: 1,
  },
};

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar />
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
