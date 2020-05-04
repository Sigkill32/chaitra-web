import React from "react";
import { Link } from "react-router-dom";
import { textGradient } from "./../../utils";

const DesignCard = ({ head, desc, path, src }) => {
  return (
    <div className="design-card">
      <div className="screen-text">
        <img src={src} alt="Screen" />
        <div>
          <h1>{head}</h1>
          <p>{desc}</p>
          <div className="resume card-link">
            <div>
              <Link style={textGradient} to={`/design/?id=${path}`}>
                View Case Study
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
