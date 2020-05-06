import React, { Component } from "react";
import { db } from "../firebaseConfig";
import queryString from "query-string";
import Spinner from "react-spinkit";
import LazyLoad from "react-lazyload";

class DesignDetails extends Component {
  state = {
    designData: {},
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.getDesignData(params.id);
  }

  getDesignData = async (id) => {
    try {
      const designRef = await db.collection("designs").doc(`design${id}`).get();
      const designData = designRef.data();
      this.setState({ designData });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { designData } = this.state;
    const {
      head,
      problem,
      idea,
      challenges,
      approach,
      projectLen,
      research0,
      research1,
      personaUrls,
      infoArch,
      wireframes0,
      wireframeUrl,
      wireframes1,
      screens,
      conclusion,
    } = designData;
    return (
      <div className="design-details">
        {designData.head ? (
          <>
            <h1>{head}</h1>
            <div className="design-container">
              <h2>Problem</h2>
              <p>{problem}</p>
              <h2>Idea</h2>
              <p>{idea}</p>
              <h2>Challenges</h2>
              <ul>
                {challenges
                  ? challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))
                  : null}
              </ul>
              <h2>Approach</h2>
              <p>{approach}</p>
              <h2>Length of project</h2>
              <p>{projectLen}</p>
              <h2>Research (1st phase)</h2>
              <p>During the research phase, I wanted to achieve a few goals:</p>
              <ul>
                {research0
                  ? research0.map((research, index) => (
                      <li key={index}>{research}</li>
                    ))
                  : null}
              </ul>
              <h2>Research (2nd phase):User Personas</h2>
              <p>{research1}</p>
              {personaUrls
                ? personaUrls.map((persona, index) => (
                    <LazyLoad key={index}>
                      <img className="pesona-img" src={persona} alt="persona" />
                    </LazyLoad>
                  ))
                : null}
              <h2>Inforamtion Architecture</h2>
              <p>{infoArch}</p>
              <img
                src={wireframeUrl}
                alt="Wire Frame"
                className="wireframe-img"
              />
              <h2>Wireframes: Low-Fidelity</h2>
              <p>{wireframes0}</p>
              <h2>Wireframes: High-Fidelity</h2>
              <p>{wireframes1}</p>
              {screens
                ? screens.map((screen, index) => (
                    <LazyLoad key={index}>
                      <img src={screen} alt="Screen" className="screen-img" />
                    </LazyLoad>
                  ))
                : null}
              <h2>Conclusion</h2>
              <p>{conclusion}</p>
            </div>
          </>
        ) : (
          <div className="spinner">
            <Spinner name="ball-triangle-path" color="#ff6b15" />
          </div>
        )}
      </div>
    );
  }
}

export default DesignDetails;
