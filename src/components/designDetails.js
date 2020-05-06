import React, { Component } from "react";
import { db } from "../firebaseConfig";
import queryString from "query-string";

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
      console.log(designData);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { designData } = this.state;
    const { head, problem, idea, challenges } = designData;
    return (
      <div className="design-details">
        <h1>{head}</h1>
        <div className="design-container">
          <h2>Problem</h2>
          <p>{problem}</p>
          <h2>Idea</h2>
          <p>{idea}</p>
          <h2>Challenges</h2>
          {challenges}
        </div>
      </div>
    );
  }
}

export default DesignDetails;
