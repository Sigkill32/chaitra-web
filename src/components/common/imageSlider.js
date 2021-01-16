import React, { Component } from "react";
import forwardButton from "../../images/forwardDis.svg";
import backButton from "../../images/backDis.svg";
import Spinner from "react-spinkit";

class ImageSlider extends Component {
  state = {
    imgIndex: 0,
    loaded: false,
  };

  handleBack = () => {
    const { imgs } = this.props;
    const { imgIndex } = this.state;
    if (imgIndex === 0) this.setState({ imgIndex: imgs.length - 1 });
    else this.setState((prevState) => ({ imgIndex: prevState.imgIndex - 1 }));
  };

  handleForward = () => {
    const { imgs } = this.props;
    const { imgIndex } = this.state;
    if (imgIndex === imgs.length - 1) this.setState({ imgIndex: 0 });
    else this.setState((prevState) => ({ imgIndex: prevState.imgIndex + 1 }));
  };

  render() {
    const { imgIndex, loaded } = this.state;
    const { imgs } = this.props;
    return (
      <div className="slider-container">
        <div className="current-image">
          {!loaded && (
            <div className="spinner">
              <Spinner name="double-bounce" color="#ff6b15" />
            </div>
          )}
          <img
            style={this.state.loaded ? {} : { display: "none" }}
            src={imgs[imgIndex]}
            alt="Image"
            onLoad={() => this.setState({ loaded: true })}
          />
        </div>
        <div className="slider-buttons">
          <button className="arrow">
            <img src={backButton} alt="forward" onClick={this.handleBack} />
          </button>
          <p>
            {imgIndex + 1} of {imgs.length}
          </p>
          <button className="arrow">
            <img
              src={forwardButton}
              alt="forward"
              onClick={this.handleForward}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default ImageSlider;
