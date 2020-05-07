import React, { Component } from "react";
import CommentCard from "./common/commentCard";

class Comment extends Component {
  state = {
    name: "",
    comment: "",
    email: "",
  };

  render() {
    const { comments } = this.props;
    return (
      <div className="comment">
        <h1>Comments</h1>
        <div className="commnets-container">
          {comments
            ? comments.map((comment) => <CommentCard comment={comment} />)
            : null}
        </div>
        <div className="comment-form">
          <h2>Leave a reply</h2>
          <div className="name-email">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="email" placeholder="Email" />
          </div>
          <input type="text" name="comment" placeholder="Your Comment" />
          <button>POST</button>
        </div>
      </div>
    );
  }
}

export default Comment;
