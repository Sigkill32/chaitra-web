import React, { Component } from "react";
import NavBar from "./navbar";
import { textGradient } from "./../utils";
import chaitra from "../images/chaitra.png";
import Connect from "./common/connect";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home">
        <NavBar />
        <div className="intro-container">
          <div className="intro-text">
            <h1>
              I’m <span style={textGradient}>Chaitra Mallikarjuna</span>, a
              product designer and a marketing specialist. I love designing
              interactions that make marketing products feel effortless.
            </h1>
          </div>
          <div className="intro-photo">
            <div className="image-holder">
              <img src={chaitra} alt="Chaitra Mallikarjuna" />
            </div>
          </div>
        </div>
        <Connect />
      </div>
    );
  }
}

export default Home;
