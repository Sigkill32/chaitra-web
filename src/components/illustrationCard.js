import React from "react";
import like from "../images/like.svg";
import liked from "../images/liked.svg";

const IllustrationCard = ({ src, isLiked, likes, id, onHandleLike }) => {
  return (
    <div className="ill-card">
      <img src={src} alt="Illustration" className="ill-img" />
      <div className="response-container">
        <button onClick={() => onHandleLike(id)}>
          <img className="like-img" src={isLiked ? liked : like} alt="like" />
        </button>
        <span style={{ color: "grey" }}>{likes}</span>
      </div>
    </div>
  );
};

export default IllustrationCard;
