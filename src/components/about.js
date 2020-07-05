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

class About extends Component {
  state = {
    posts: [],
    timer: null,
    page: 0,
    postsData: [],
    postCount: 0,
    totalPages: 0,
    currentPosts: [],
  };

  componentDidMount() {
    const { posts } = this.state;
    this.getTotalPosts();
    // this.getUrls();
    if (posts.length === 0) {
      this.getData(0);
    }
  }

  getData = async (page) => {
    try {
      let posts = [];
      let postsData = [...this.state.postsData];
      if (postsData.length === 0) {
        postsData = await this.retriveLikes();
        this.setState({ postsData });
      }
      const storageRef = storage.ref("Posts/");
      let localLikes = null;
      if (localStorage.getItem("likes")) {
        localLikes = JSON.parse(localStorage.getItem("likes"));
      }
      const { postCount } = this.state;
      const init = page * LIMIT;
      const maxLimit =
        page * LIMIT + LIMIT > postCount ? postCount : page * LIMIT + LIMIT;
      for (let i = init; i < maxLimit; i++) {
        const url = await storageRef.child(`post${i}.png`).getDownloadURL();
        posts.push({
          post: url,
          id: i,
          isLiked: localLikes !== null && localLikes[i] ? localLikes[i] : false,
          likes: postsData[i].likes,
        });
      }
      const newPosts = [...this.state.posts, ...posts];
      this.setState({ posts: newPosts, currentPosts: posts });
    } catch (error) {
      console.log(error);
    }
  };

  retriveLikes = async () => {
    let postsData = [];
    try {
      const querySnapshot = await db.collection("posts").get();
      querySnapshot.forEach((doc) => {
        postsData.push(doc.data());
      });
      return postsData;
    } catch (error) {
      console.log(error);
    }
  };

  getTotalPosts = async () => {
    try {
      const postRef = await db.collection("totalCounts").doc("posts").get();
      const postCount = postRef.data().count;
      const totalPages = Math.ceil(postCount / LIMIT) - 1;
      this.setState({ postCount, totalPages });
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
    try {
      db.collection("posts").doc(`post${id}`).set({ likes: likeCount });
      // console.log("updated", id, "count", likeCount);
    } catch (error) {
      console.log(error);
    }
  };

  handleLike = (id) => {
    const { posts } = this.state;
    // console.log(id);
    // console.log(posts);
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
    this.setState((prevState) => ({
      page: prevState.page - 1,
      currentPosts: [],
    }));
    this.getData(page - 1);
  };

  handleForward = () => {
    const { page } = this.state;
    this.setState((prevState) => ({
      page: prevState.page + 1,
      currentPosts: [],
    }));
    this.getData(page + 1);
  };

  /* 
    getUrls = async () => {
    const expScreens = [];
    const storageRef = storage.ref("design/design1/screens");
    const url = await storageRef.listAll();
    const screenCount = url.items.length;
    for (let i = 0; i < screenCount; i++) {
      const screen = await url.items[i].getDownloadURL();
      expScreens.push(screen);
    }
    console.log("data recieved");
    const len = expScreens.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        const scj = parseInt(expScreens[j].split("img")[1].split(".png")[0]);
        const scj1 = parseInt(
          expScreens[j + 1].split("img")[1].split(".png")[0]
        );
        if (scj > scj1) {
          const temp = expScreens[j];
          expScreens[j] = expScreens[j + 1];
          expScreens[j + 1] = temp;
        } 
      }
    }
    console.log("sorted");
    db.collection("designs")
      .doc("design1")
      .set({ screens: expScreens }, { merge: true });
    console.log("pushed to db");
  }; */

  render() {
    const { page, totalPages, currentPosts } = this.state;
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
                <a
                  href="https://firebasestorage.googleapis.com/v0/b/chaitra-web.appspot.com/o/resume.pdf?alt=media&token=c791f3c7-5d99-4c06-9c9b-0e33faa9c051"
                  style={textGradient}
                  rel="noopener noreferrer"
                  target="_blank"
                >
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
          {currentPosts.length !== 0 ? (
            <div className="post-holder">
              <div className="posts-container">
                <button
                  className="arrow"
                  onClick={this.handleBack}
                  disabled={page === 0}
                >
                  <img src={page === 0 ? backDis : back} alt="back" />
                </button>
                {currentPosts.map((post) => (
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
                  disabled={page === totalPages}
                >
                  <img
                    src={page === totalPages ? forwardDis : forward}
                    alt="forward"
                  />
                </button>
              </div>
              <h4>
                {page + 1}/{totalPages + 1}
              </h4>
            </div>
          ) : (
              <div className="spinner">
                <Spinner name="double-bounce" color="#ff6b15" />
              </div>
            )}
        </div>
        <Connect />
      </div>
    );
  }
}

export default About;
