import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404 Not found</h1>
      <h1>You seem lost in the colours</h1>
      <Link to="/home">Back to Reality</Link>
    </div>
  );
};

export default NotFound;
