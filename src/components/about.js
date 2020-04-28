import React, { Component } from "react";
import NavBar from "./navbar";
import { textGradient } from "./../utils";
import artStare from "../images/artStare.jpg";
import Connect from "./common/connect";
import { db } from "../firebaseConfig";
import { storage } from "../firebaseConfig";
import IllustrationCard from "./illustrationCard";
import forward from "../images/forward.svg";
import back from "../images/back.svg";
import forwardDis from "../images/forwardDis.svg";
import backDis from "../images/backDis.svg";
import Spinner from "react-spinkit";

const LIMIT = 3;
const TOTAL_PAGES = 3;

class About extends Component {
  state = {
    posts: [],
    timer: null,
    page: 0,
  };

  componentDidMount() {
    const { posts } = this.state;
    if (posts.length === 0) {
      this.getData(0);
    }
  }

  getData = async (page) => {
    try {
      let posts = [];
      let postsData = [];
      const querySnapshot = await db.collection("posts").get();
      querySnapshot.forEach((doc) => {
        postsData.push(doc.data());
      });
      const storageRef = storage.ref("Posts/");
      let localLikes = null;
      if (localStorage.getItem("likes")) {
        localLikes = JSON.parse(localStorage.getItem("likes"));
      }
      const init = page * LIMIT;
      const maxLimit = page * LIMIT + LIMIT;
      for (let i = init; i < maxLimit; i++) {
        const url = await storageRef.child(`post${i}.png`).getDownloadURL();
        posts.push({
          post: url,
          id: i,
          isLiked: localLikes !== null ? localLikes[i] : false,
          likes: postsData[i].likes,
        });
      }
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  };

  debouncedUpdate = (likeCount, id) => {
    const { timer } = this.state;
    clearInterval(timer);
    const newTimer = setTimeout(this.updateLikes, 500, likeCount, id);
    this.setState({ timer: newTimer });
  };

  updateLikes = (likeCount, id) => {
    db.collection("posts").doc(`post${id}`).set({ likes: likeCount });
  };

  handleLike = (id) => {
    const { posts } = this.state;
    posts[id].isLiked = !posts[id].isLiked;
    if (posts[id].isLiked) {
      this.debouncedUpdate(posts[id].likes + 1, id);
      posts[id].likes += 1;
    } else {
      this.debouncedUpdate(posts[id].likes - 1, id);
      posts[id].likes -= 1;
    }
    this.setState({ posts });
    const localLikes = posts.map((post) => post.isLiked);
    localStorage.setItem("likes", JSON.stringify(localLikes));
  };

  handleBack = () => {
    const { page } = this.state;
    this.setState((prevState) => ({ page: prevState.page - 1, posts: [] }));
    this.getData(page - 1);
  };

  handleForward = () => {
    const { page } = this.state;
    this.setState((prevState) => ({ page: prevState.page + 1, posts: [] }));
    this.getData(page + 1);
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="about">
        <NavBar />
        <div className="story-container">
          <div className="life-story">
            <h2>A little bit about myself</h2>
            <p>
              My name is Chaitra Mallikarjuna and I'm passionate about improving
              the lives of others through design. I'm constantly learning new
              things every day and love meeting people who are motivated and
              unafraid of sharing their ideas with the world. Building engaging
              experiences is what drives me. Being a master student at the
              University of Bologna, I’m inspired by Europe's art and culture.
            </p>
            <p>
              I started my journey in electronics engineering and marketing but
              found solace in design. I'm a self-taught designer and have
              learned a lot of the processes, concepts, and theories of UX/UI
              and product design through one of my best friends, attending
              workshops, reading blogs, and applying these to projects in my
              spare time and at work. I am very much a big-picture thinker and
              enjoy working on products end to end, from ideation all the way to
              development.
            </p>
            <div className="resume">
              <div>
                <a href="#" style={textGradient}>
                  Resume
                </a>
              </div>
            </div>
          </div>
          <div className="story-image">
            <img src={artStare} alt="Me amaized by vibrant colours" />
          </div>
        </div>
        <div className="illustrations">
          <h2>illustrations</h2>
          <p>
            I sometimes think there is nothing more delightful than drawing
            illustrations. I draw and make art to communicate ideas in a way
            everyone understands.
          </p>
          {posts.length !== 0 ? (
            <div className="posts-container">
              <button
                className="arrow"
                onClick={this.handleBack}
                disabled={page === 0}
              >
                <img src={page === 0 ? backDis : back} alt="back" />
              </button>
              {posts.map((post) => (
                <IllustrationCard
                  key={post.id}
                  src={post.post}
                  id={post.id}
                  likes={post.likes}
                  isLiked={post.isLiked}
                  onHandleLike={this.handleLike}
                />
              ))}
              <button
                className="arrow"
                onClick={this.handleForward}
                disabled={page === TOTAL_PAGES}
              >
                <img
                  src={page === TOTAL_PAGES ? forwardDis : forward}
                  alt="forward"
                />
              </button>
            </div>
          ) : (
            <div className="spinner">
              <Spinner name="double-bounce" />
            </div>
          )}
        </div>
        <Connect />
      </div>
    );
  }
}

export default About;
