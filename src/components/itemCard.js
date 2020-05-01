import React from "react";
import like from "../images/like.svg";
import liked from "../images/liked.svg";
import LazyLoad from "react-lazyload";

const ItemCard = ({
  head,
  desc,
  screens,
  likes,
  onHandleLike,
  isLiked,
  id,
}) => {
  return (
    <div className="item-card-container">
      <div className="item-card">
        <h1>{head}</h1>
        <p>{desc}</p>
        <div className="exp-screens">
          {screens.map((screen, index) => (
            <LazyLoad key={index}>
              <img src={screen} alt="screen" />
            </LazyLoad>
          ))}
        </div>
      </div>
      <div className="item-response">
        <button onClick={() => onHandleLike(id)}>
          <img className="like-img" src={isLiked ? liked : like} alt="like" />
        </button>
        <span style={{ color: "grey" }}>{likes}</span>
      </div>
    </div>
  );
};

export default ItemCard;
