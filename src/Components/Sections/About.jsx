import React from "react";
import Home from "./Home";
import "./About.css";

export default function About(props) {
  const sideClass = props.isLeft ? "about-left" : "about-right";

  return (
    <div className={`about-responsive ${sideClass}`}>
      <Home {...props} />
    </div>
  );
}