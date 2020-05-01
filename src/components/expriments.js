import React, { Component } from "react";
import NavBar from "./navbar";
import { db } from "../firebaseConfig";
import { storage } from "../firebaseConfig";
import ItemCard from "./itemCard";

class Experiments extends Component {
  state = {
    experiments: [],
  };

  componentDidMount() {
    this.getExperiments();
  }

  getExperiments = async () => {
    try {
      const experiments = [];
      const expData = await this.getExDetails();
      const expCount = expData.length;
      for (let i = 0; i < expCount; i++) {
        const screens = await this.getExpScreens(i);
        experiments.push({ ...expData[i], screens });
      }
      this.setState({ experiments });
      console.log(experiments);
    } catch (error) {
      console.log(error);
    }
  };

  getExpScreens = async (n) => {
    try {
      const expScreens = [];
      const storageRef = storage.ref(`Experiments/exp${n}/`);
      const url = await storageRef.listAll();
      const screenCount = url.items.length;
      for (let i = 0; i < screenCount; i++) {
        const screen = await url.items[i].getDownloadURL();
        expScreens.push(screen);
      }
      return expScreens;
    } catch (error) {
      console.log(error);
    }
  };

  getExDetails = async () => {
    const expData = [];
    try {
      const querySnapshot = await db.collection("Experiments").get();
      querySnapshot.forEach((doc) => {
        expData.push(doc.data());
      });
      return expData;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { experiments } = this.state;
    return (
      <div className="experiments">
        <NavBar />
        <div className="exp-list">
          {experiments.length !== 0
            ? experiments.map((experiment, index) => (
                <ItemCard {...experiment} key={index} />
              ))
            : "Loading..."}
        </div>
      </div>
    );
  }
}

export default Experiments;
