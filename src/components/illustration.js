import React, { Component } from "react";
import NavBar from "./navbar";
import { storage } from "../firebaseConfig";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ItemCard from "./itemCard";
import { db } from "../firebaseConfig";

const styles = {
  root: {
    backgroundColor: "#fafafa",
  },
  h1: {
    textAlign: "center",
    margin: "40px 0",
    fontWeight: "normal",
  },
};

class Illustration extends Component {
  state = {
    posts: [],
    timer: null,
  };

  componentDidMount() {
    this.getDownloadUrl();
  }

  getDownloadUrl = async () => {
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
      for (let i = 0; i < 7; i++) {
        const url = await storageRef.child(`Post${i}.png`).getDownloadURL();
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

  render() {
    const { posts } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        {posts.length === 0 ? (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ height: "80vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <div>
            <h1 className={classes.h1}>Illustrations</h1>
            <Grid container direction="column">
              <Grid container justify="space-around">
                {posts.map((post) => (
                  <ItemCard
                    img={post.post}
                    onHandleLike={this.handleLike}
                    id={post.id}
                    key={post.id}
                    isLiked={post.isLiked}
                    likes={post.likes}
                  />
                ))}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Illustration);
