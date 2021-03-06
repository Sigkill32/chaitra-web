import React from "react";
import { Link } from "react-router-dom";
import { textGradient } from "./../../utils";

const DesignCard = ({
  head,
  desc,
  path,
  src,
  width,
  classes,
  link,
  appName,
}) => {
  return (
    <div className={classes ? "design-card " + classes : "design-card"}>
      <div className="screen-text">
        <img src={src} alt="Screen" />
        <div>
          <h1>{head}</h1>
          <p>{desc}</p>
          {link && (
            <a href={link.href}>
              <span>Visit: </span> {link.name}
            </a>
          )}
          <div className="resume card-link">
            {path ? (
              <div>
                <Link style={textGradient} to={`/design/?id=${path}`}>
                  View Case Study
                </Link>
              </div>
            ) : (
              <div>
                <Link style={textGradient} to={`/${appName}`}>
                  View Designs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
