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
  Modal
} from "react-bootstrap";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const [feature, setFeature] = useState(0);
  const [corpEmail, setCorpEmail] = useState("");
  const [corpPassword, setCorpPassword] = useState("");
  const [corpModal, setCorpModal] = useState(false);
  const [corpError, setCorpError] = useState(false);

  const [colId, setColId] = useState("");
  const [colPassword, setColPassword] = useState("");
  const [colModal, setColModal] = useState(false);
  const [colError, setColError] = useState(false);

  const [governId, setGovernId] = useState("");
  const [governPassword, setGovernPassword] = useState("");
  const [govError, setGovError] = useState(false);

  const [isCorp, setIsCorp] = useState(null);

  const [resetPassword, setResetPassword] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const [onSubmit, setOnSubmit] = useState(false);

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleCorpModalShow = () => setCorpModal(true);
  const handleCorpModalClose = () => setCorpModal(false);

  const handleColModalShow = () => setColModal(true);
  const handleColModalClose = () => setColModal(false);

  const handleCorpLogin = (e) => {
    e.preventDefault();
    setOnSubmit(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/corp_user`, {
        type: "login",
        email: corpEmail,
        password: corpPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.history.replaceState({}, document.title, "/");
        setOnSubmit(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setCorpError(true);
        setErrorMessage(err.response.data.message);
        setOnSubmit(false);
        setTimeout(() => {
          setCorpError(false);
        }, 3000);
      });
  }

  const handleColLogin = (e) => {
    e.preventDefault();
    setOnSubmit(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/coll_user`, {
        type: "login",
        email: colId,
        password: colPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.history.replaceState({}, document.title, "/");
        setOnSubmit(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setColError(true);
        setErrorMessage(err.response.data.message);
        setOnSubmit(false);
        setTimeout(() => {
          setColError(false);
        }, 3000);
      });
  }

  const handleGovLogin = (e) => {
    e.preventDefault();
    setOnSubmit(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/gov_user`, {
        type: "login",
        email: governId,
        password: governPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.history.replaceState({}, document.title, "/");
        setOnSubmit(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setGovError(true);
        setErrorMessage(err.response.data.message);
        setOnSubmit(false);
        setTimeout(() => {
          setGovError(false);
        }, 3000);
      });
  }

  return (
    <>
      { onSubmit ? (
      <div className="spinner">
        <InfinitySpin color="#0087ca" />
      </div> ) : (
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
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                <Form className="my-form-1" onSubmit={handleCorpLogin}>
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
                  <Row style={{ marginBottom: "7vh" }}>
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
                  <Row className="login-forgot-password" style={{ marginBottom: "12vh" }} onClick={handleCorpModalShow}>
                    <p>Forgot Password?</p>
                  </Row>
                  {/* Modal for forgot password and otp section */}
                  <Modal
                      style={{ background: "none" }}
                      show={corpModal}
                      onHide={handleCorpModalClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: "black" }}>
                      {(resetPassword === 0) && (
                        <Row style={{marginBottom: "1vh"}}>
                          <Col className="otp-input" md={8}>
                            <input
                              style={{color:"black", width:"90%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Enter Email"
                              spellcheck="false"
                            />
                          </Col>
                          <Col className="otp-button">
                            <Button>
                              Send OTP
                            </Button>
                          </Col>
                        </Row>
                      )}
                      {(resetPassword === 1) && (
                        <Row style={{marginBottom: "1vh"}}>
                          <Col className="otp-input" md={8}>
                            <input
                              style={{color:"black", width:"90%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Enter OTP"
                              spellcheck="false"
                            />
                          </Col>
                          <Col className="otp-button">
                            <Button>
                              Verify OTP
                            </Button>
                          </Col>
                        </Row>
                      )}
                      {(resetPassword === 2) && (<>
                        <Row style={{marginBottom: "1vh"}}>
                          <Col className="otp-input" md={6}>
                            <input
                              style={{color:"black", width:"100%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Enter Password"
                              spellcheck="false"
                            />
                          </Col>
                          <Col className="otp-input">
                            <input
                              style={{color:"black", width:"100%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Confirm Password"
                              spellcheck="false"
                            />
                          </Col>
                        </Row>
                        <Row className="otp-button">
                          <Button style={{marginLeft: "13vw", width:"30%"}}>
                            Submit
                          </Button>
                        </Row>
                        </>
                      )}
                      </Modal.Body>
                    </Modal>
                  {/* Previous and next page */}
                  <div className="error-message">
                    {corpError && <p>{errorMessage}</p>}
                  </div>
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
                <Form className="my-form-1" onSubmit={handleColLogin}>
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
                  <Row style={{ marginBottom: "7vh" }}>
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
                  <Row className="login-forgot-password" style={{ marginBottom: "12vh" }} onClick={handleColModalShow}>
                    <p>Forgot Password?</p>
                  </Row>
                  {/* Modal for forgot password and otp section */}
                  <Modal
                      style={{ background: "none" }}
                      show={colModal}
                      onHide={handleColModalClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: "black" }}>
                      {(resetPassword === 0) && (
                        <Row style={{marginBottom: "1vh"}}>
                          <Col className="otp-input" md={8}>
                            <input
                              style={{color:"black", width:"90%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Enter Email"
                              spellcheck="false"
                            />
                          </Col>
                          <Col className="otp-button">
                            <Button>
                              Send OTP
                            </Button>
                          </Col>
                        </Row>
                      )}
                      {(resetPassword === 1) && (
                        <Row style={{marginBottom: "1vh"}}>
                          <Col className="otp-input" md={8}>
                            <input
                              style={{color:"black", width:"90%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Enter OTP"
                              spellcheck="false"
                            />
                          </Col>
                          <Col className="otp-button">
                            <Button>
                              Verify OTP
                            </Button>
                          </Col>
                        </Row>
                      )}
                      {(resetPassword === 2) && (<>
                        <Row style={{marginBottom: "1vh"}}>
                          <Col className="otp-input" md={6}>
                            <input
                              style={{color:"black", width:"100%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Enter Password"
                              spellcheck="false"
                            />
                          </Col>
                          <Col className="otp-input">
                            <input
                              style={{color:"black", width:"100%", marginTop:"1%"}}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              placeholder="Confirm Password"
                              spellcheck="false"
                            />
                          </Col>
                        </Row>
                        <Row className="otp-button">
                          <Button style={{marginLeft: "13vw", width:"30%"}}>
                            Submit
                          </Button>
                        </Row>
                        </>
                      )}
                      </Modal.Body>
                    </Modal>
                  {/* Previous and next page */}
                  <div className="error-message">
                    {colError && <p>{errorMessage}</p>}
                  </div>
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
                <Form className="my-form-1" onSubmit={handleGovLogin}>
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
                  <Row style={{ marginBottom: "20vh" }}>
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
                  <div className="error-message">
                    {govError && <p>{errorMessage}</p>}
                  </div>
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
        <div className="front-img animate__animated animate__bounceIn">
          <img src={front_img2} alt="front_img_2" />
          <img src={front_img} alt="front_img" />
        </div>
        <div className="line-wrapper">
          <span className="line"></span>
        </div>
      </section>
      )}
    </>
  );
}
