import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Signup/Signup.css";
import "../Signup/Signup.scss";
import "./Login.css";
import logo from "../../images/logo.png";
import front_img from "../../images/Login_front_img_1.png";
import front_img2 from "../../images/sign_up_in_front_img2.png";
import {
  Button,
  Row,
  Col,
  Form,
} from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const [feature, setFeature] = useState(0);
  const [corpEmail, setCorpEmail] = useState("");
  const [corpPassword, setCorpPassword] = useState("");

  const [colId, setColId] = useState("");
  const [colPassword, setColPassword] = useState("");

  const [governId, setGovernId] = useState("");
  const [governPassword, setGovernPassword] = useState("");

  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <section className="sign-up-in">
        {/* Background section */}
        <div className="background-theme">{/* Background image */}</div>

        {/* Main form card */}
        <div className="main-card z-depth-5">
          {/* Top most header */}
          <div className="header">
            <img
              src={logo}
              width="50"
              className="d-inline-block my-logo"
              alt="logo"
            />
            <span className="logo-name">DataPlace</span>
            <span className="login-text">
              New User?
              <a
                className="login-btn hover-underline-animation"
                onClick={handleSignup}
              >
                Sign Up
              </a>
            </span>
          </div>

          {/* Credential form */}
          <div className="credentials">
            <div className="credentials-form">
              {(feature === 0 || feature === 1 || feature === 4) && (
                <div className="user-selection login-add-height my-mb-4">
                  <div className="upper-button">
                    <Button
                      className={
                        feature === 0
                          ? "up active activate-button"
                          : "up activate-button"
                      }
                      onClick={() => setFeature(0)}
                    >
                      Sign In As Corporate
                    </Button>
                    <Button
                      className={
                        feature === 1
                          ? "up active activate-button"
                          : "up activate-button"
                      }
                      onClick={() => setFeature(1)}
                    >
                      Sign In As College
                    </Button>
                    <Button
                      className={
                        feature === 4
                          ? "up active activate-button"
                          : "up activate-button"
                      }
                      onClick={() => setFeature(4)}
                    >
                      Sign In As Government
                    </Button>
                  </div>
                </div>
              )}

              {/* Separation line for buttons and form */}
              <hr className="my-mb-5 separation-line" />

              {/* Information for corporate */}
              {feature === 0 && (
                <Form className="my-form-1" onSubmit={() => setFeature(3)}>
                  <Row style={{ marginBottom: "10vh" }}>
                    <Col>
                      <div className="input-block login-input-wrapper">
                        <input
                          type="email"
                          name="input-text"
                          id="input-text"
                          required
                          value={corpEmail}
                          onChange={(e) => setCorpEmail(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Corporate Email</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "25vh" }}>
                    <Col>
                      <div className="input-block login-input-wrapper">
                        <input
                          type="password"
                          name="input-text"
                          id="input-text"
                          required
                          value={corpPassword}
                          onChange={(e) => setCorpPassword(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Password</span>
                      </div>
                    </Col>
                  </Row>
                  {/* Previous and next page */}
                  <Row>
                    <Col>
                      <Button
                        onClick={() => navigate("/")}
                        className="close cancel-button"
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Button type="submit" className="close submit-button">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}

              {/* information for college */}
              {feature === 1 && (
                <Form className="my-form-1" onSubmit={() => setFeature(2)}>
                  <Row style={{ marginBottom: "10vh" }}>
                    <Col>
                      <div className="input-block login-input-wrapper">
                        <input
                          type="email"
                          name="input-text"
                          id="input-text"
                          required
                          value={colId}
                          onChange={(e) => setColId(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">College Email</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "25vh" }}>
                    <Col>
                      <div className="input-block login-input-wrapper">
                        <input
                          type="password"
                          name="input-text"
                          id="input-text"
                          required
                          value={colPassword}
                          onChange={(e) => setColPassword(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Password</span>
                      </div>
                    </Col>
                  </Row>
                  {/* Previous and next page */}
                  <Row>
                    <Col>
                      <Button
                        onClick={() => navigate("/")}
                        className="close cancel-button"
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Button type="submit" className="close submit-button">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}

              {/* Information for government */}
              {feature === 4 && (
                <Form className="my-form-1">
                  <Row style={{ marginBottom: "10vh" }}>
                    <Col>
                      <div className="input-block login-input-wrapper">
                        <input
                          type="email"
                          name="input-text"
                          id="input-text"
                          required
                          value={governId}
                          onChange={(e) => setGovernId(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Government Id</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "25vh" }}>
                    <Col>
                      <div className="input-block login-input-wrapper">
                        <input
                          type="password"
                          name="input-text"
                          id="input-text"
                          required
                          value={governPassword}
                          onChange={(e) => setGovernPassword(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Password</span>
                      </div>
                    </Col>
                  </Row>
                  {/* Previous and next page */}
                  <Row>
                    <Col>
                      <Button
                        onClick={() => navigate("/")}
                        className="close cancel-button"
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Button type="submit" className="close submit-button">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          </div>
        </div>

        {/* Front image to be displayed on card */}
        <div className="front-img">
          <img src={front_img2} alt="front_img_2" />
          <img src={front_img} alt="front_img" />
        </div>
        <div className="line-wrapper">
          <span className="line"></span>
        </div>
      </section>
    </>
  );
}
