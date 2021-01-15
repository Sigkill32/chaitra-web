import React, { Component } from "react";

class ImageSlider extends Component {
  state = {
    imgIndex: 0,
  };
  render() {
    const { imgIndex } = this.state;
    const { imgs } = this.props;
    return (
      <div className="slider-container">
        <div className="current-image">
          <img src={imgs[imgIndex]} alt="Image" />
        </div>
      </div>
    );
  }
}

export default ImageSlider;
