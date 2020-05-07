import React from "react";
import cm from "../../images/cm.svg";

const getProfileLetter = (name) => name.charAt(0).toUpperCase();

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-container">
      <div className="prof-name">
        <div className="profile-pic">
          <h2>{getProfileLetter(comment.name)}</h2>
        </div>
        <h2>{comment.name}</h2>
      </div>
      <p className="comment-text">{comment.comment}</p>
      {comment.reply !== "" ? (
        <div className="reply">
          <div className="prof-name">
            <img src={cm} alt="Chaitra" className="reply-chaitra" />
            <h2>Chaitra</h2>
          </div>
          <p className="comment-text">{comment.reply}</p>
        </div>
      ) : null}
    </div>
  );
};

export default CommentCard;
