import React, { Component } from "react";
import CommentCard from "./common/commentCard";
import { db } from "../firebaseConfig";

class Comment extends Component {
  state = {
    name: "",
    comment: "",
    email: "",
    comments: [],
  };

  componentDidMount() {
    const { comments } = this.props;
    this.setState({ comments });
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { id } = this.props;
    const hasCommented = localStorage.getItem(`hasCommented${id}`);
    if (!hasCommented) {
      const { name, comment, email, comments } = this.state;
      if ((name === "" || comment === "", email === "")) {
        alert("One or more field are empty");
        return false;
      }
      const newCommnets = [...comments, { name, comment, email, reply: "" }];
      this.pushComment(newCommnets);
      this.setState({
        comments: newCommnets,
        name: "",
        comment: "",
        email: "",
      });
      localStorage.setItem(`hasCommented${id}`, true);
    } else {
      alert("You have already posted a comment");
    }
  };

  pushComment = (comments) => {
    const { id } = this.props;
    db.collection("designs")
      .doc(`design${id}`)
      .set({ comments: comments }, { merge: true });
  };

  render() {
    const { name, comment, email, comments } = this.state;
    return (
      <div className="comment">
        <h1>Comments</h1>
        <div className="commnets-container">
          {comments
            ? comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
              ))
            : null}
        </div>
        <div className="comment-form">
          <h2>Leave a reply</h2>
          <div className="name-email">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={name}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <textarea
            className="comment-input"
            type="text"
            name="comment"
            placeholder="Your Comment"
            cols="40"
            rows="8"
            onChange={this.handleChange}
            value={comment}
          />
          <button onClick={this.handleSubmit}>POST</button>
        </div>
      </div>
    );
  }
}

export default Comment;
