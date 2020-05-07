import React from "react";

getProfileLetter = (name) => name.charAt(0);

const CommentCard = ({ comment }) => {
  return (
    <div className="commnet-container">
      <div className="prof-name">
        <div className="profile-pic">{getProfileLetter(comment.name)}</div>
        <p>{comment.name}</p>
      </div>
      <p className="commnet-text">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
