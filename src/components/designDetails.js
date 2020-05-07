import React, { Component } from "react";
import { db } from "../firebaseConfig";
import queryString from "query-string";
import Spinner from "react-spinkit";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { textGradient } from "./../utils";
import like from "../images/like.svg";
import liked from "../images/liked.svg";
import Comment from "./comment";

class DesignDetails extends Component {
  state = {
    designData: {},
    id: null,
  };

  componentDidMount() {
    const params = queryString.parse(this.props.location.search);
    this.setState({ id: params.id });
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

  handleLikeClick = () => {};

  render() {
    const { designData, id } = this.state;
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
      likes,
      comments,
    } = designData;
    return (
      <>
        <div className="design-nav">
          <h1>Design Details</h1>
          <div className="resume back-button">
            <div>
              <Link to="/home" style={textGradient}>
                BACK
              </Link>
            </div>
          </div>
        </div>
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
                <ul className="bullet-points">
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
                <p>
                  During the research phase, I wanted to achieve a few goals:
                </p>
                <ul className="bullet-points">
                  {research0
                    ? research0.map((research, index) => (
                        <li key={index}>{research}</li>
                      ))
                    : null}
                </ul>
                <h2>Research (2nd phase):User Personas</h2>
                <p>{research1}</p>
                {/* <div className="persona">
                  {personaUrls
                    ? personaUrls.map((persona, index) => (
                        <LazyLoad key={index}>
                          <img src={persona} alt="persona" />
                        </LazyLoad>
                      ))
                    : null}
                </div> */}
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
                {/* <div className="screens">
                  {screens
                    ? screens.map((screen, index) => (
                        <LazyLoad key={index}>
                          <img src={screen} alt="Screen" />
                        </LazyLoad>
                      ))
                    : null}
                </div> */}
                <h2>Conclusion</h2>
                <p>{conclusion}</p>
              </div>
              <div className="details-like">
                <div className="like-container">
                  <button onClick={this.handleLikeClick}>
                    <img src={like} alt="like" />
                  </button>
                </div>
                <p>{`${likes} likes`}</p>
              </div>
              <Comment id={id} comments={comments} />
            </>
          ) : (
            <div className="spinner des-spinner">
              <Spinner name="ball-triangle-path" color="#ff6b15" />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default DesignDetails;
