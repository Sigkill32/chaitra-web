import React, { Component } from "react";
import NavBar from "./navbar";
import { storage } from "../firebaseConfig";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ItemCard from "./itemCard";

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
  };

  componentDidMount() {
    this.getDownloadUrl();
  }

  getDownloadUrl = async () => {
    try {
      let posts = [];
      const storageRef = storage.ref("Posts/");
      for (let i = 0; i < 7; i++) {
        const file = `Post${i}.png`;
        const url = await storageRef.child(file).getDownloadURL();
        posts.push({ post: url, id: i, isLiked: false });
      }
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  };

  handleLike = (id) => {
    const { posts } = this.state;
    posts[id].isLiked = !posts[id].isLiked;
    this.setState({ posts });
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
