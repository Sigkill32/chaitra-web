import React, { Component } from "react";
import NavBar from "./navbar";
import { textGradient } from "./../utils";
import chaitra from "../images/chaitra.png";
import Connect from "./common/connect";
import { NavLink } from "react-router-dom";
import DesignCard from "./common/designCard";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home">
        <NavBar />
        <div className="intro-container">
          <div className="intro-text">
            <h1>
              I’m{" "}
              <NavLink
                to="/about"
                style={{
                  textDecoration: "none",
                  ...textGradient,
                  outline: "none",
                }}
              >
                Chaitra Mallikarjuna
              </NavLink>
              , a product designer and a marketing specialist. I love designing
              interactions that make marketing products feel effortless.
            </h1>
          </div>
          <div className="intro-photo">
            <div className="image-holder">
              <img src={chaitra} alt="Chaitra Mallikarjuna" />
            </div>
          </div>
        </div>
        <div className="recent-work">
          <DesignCard
            head="Fitness App"
            desc="A practical case study presenting UI and UX design for a mobile gym fitness app: a convenient user interface with custom icons and original onboarding illustrations."
            src="https://firebasestorage.googleapis.com/v0/b/chaitra-web.appspot.com/o/design%2Fdesign0%2Fscreens%2Fimg11.png?alt=media&token=67618df7-cdfe-4a74-a401-7a6dc5799560"
            path="0"
          />
          <DesignCard
            head="Food Delivery App"
            desc="A practical case study presenting UI and UX design for mobile food delivery app: that provides food delivery at your door in very less time and with the best packaging."
            src="https://firebasestorage.googleapis.com/v0/b/chaitra-web.appspot.com/o/design%2Fdesign1%2Fscreens%2Fimg16.png?alt=media&token=46903b53-0dbf-464f-bf5f-3dad5ec62151"
            path="1"
          />
          <DesignCard
            head="Your personalised search engine"
            desc="Save your small yet important piceces of imformation in a template that is easy to organise, retrieve and share! blobs is your redefined next-gen bookmarking tool"
            src="https://firebasestorage.googleapis.com/v0/b/chaitra-web.appspot.com/o/design%2Fdesign2%2Fscreens%2Fimg0.svg?alt=media&token=301e17ce-d5d8-4715-8dce-6ac9f51fcf9b"
            classes={"large-card"}
            appName={"blobs"}
            link={{ href: "https://blobs.co/", name: "Blobs.co" }}
          />
        </div>
        <Connect />
      </div>
    );
  }
}

export default Home;
