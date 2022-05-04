import React from "react";
import Typewriter from "typewriter-effect";
import "animate.css";
import logo from "../../images/logo.png";
import "./Loader.css";

export default function Loader() {
  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="loader">
        <img
          className="animate__animated animate__heartBeat animate__faster"
          src={logo}
          alt="logo"
        />
        <div className="animate__animated animate__bounceInUp logo-name">
          <Typewriter
            options={{
              strings: ["DataPlace"],
              autoStart: true,
              pauseFor: 600,
              loop: true,
            }}
          />
        </div>
      </div>
    </>
  );
}
