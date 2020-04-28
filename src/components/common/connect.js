import React from "react";
import dribbble from "../../images/dribbble.svg";
import facebook from "../../images/facebook.svg";
import insta from "../../images/insta.svg";
import linkedin from "../../images/linkedin.svg";

const Connect = () => {
  return (
    <div className="connect">
      <h1>Let's Connect</h1>
      <p>Feel free to reach out for collaborations or just a friendly hello</p>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="mailto:chaitramallikarjuna@gmail.com"
      >
        chaitramallikarjuna@gmail.com
      </a>
      <div className="social">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://dribbble.com/Chaitra_Mallikarjuna"
        >
          <img src={dribbble} alt="dribble" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.facebook.com/mallikarjunachaitra"
        >
          <img src={facebook} alt="Facebook" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.instagram.com/designl_y/?hl=en"
        >
          <img src={insta} alt="Instagram" />
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/chaitra-mallikarjuna-22585a175/"
        >
          <img src={linkedin} alt="LiknedIn" />
        </a>
      </div>
    </div>
  );
};

export default Connect;
