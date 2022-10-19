import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Signup/Signup.css";
import "../Signup/Signup.scss";
import "./Login.css";
import logo from "../../images/logo.png";
import front_img from "../../images/Login_front_img_1.png";
import front_img2 from "../../images/sign_up_in_front_img2.png";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();

  const [colId, setColId] = useState("");
  const [colPassword, setColPassword] = useState("");
  const [colModal, setColModal] = useState(false);
  const [colError, setColError] = useState(false);

  const [resetPassword, setResetPassword] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const [onSubmit, setOnSubmit] = useState(false);

  const [otpEmail, setOtpEmail] = useState("");

  const [modalError, setModalError] = useState(false);

  const [otp, setOtp] = useState("");

  const [userOtp, setUserOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleColModalShow = () => {
    setColModal(true);
  };

  const handleColModalClose = () => {
    setColModal(false);
  };

  const handleColLogin = (e) => {
    e.preventDefault();
    setOnSubmit(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/college/login`, {
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
          setErrorMessage("");
          setColError(false);
        }, 3000);
      });
  };

  const handleOTPSend = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/college/send_otp`, {
        email: otpEmail,
      })
      .then((res) => {
        setButtonDisabled(false);
        let otp = String(res.data.otp);
        setOtp(otp);
        setResetPassword(1);
      })
      .catch((err) => {
        setButtonDisabled(false);
        setModalError(true);
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
          setModalError(false);
        }, 3000);
      });
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (otp === userOtp) {
      setButtonDisabled(false);
      setResetPassword(2);
    } else {
      setModalError(true);
      setErrorMessage("OTP not matched");
      setTimeout(() => {
        setErrorMessage("");
        setModalError(false);
      }, 3000);
      setButtonDisabled(false);
      setResetPassword(0);
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (newPassword !== confirmNewPassword) {
      setModalError(true);
      setErrorMessage("Password not matched");
      setTimeout(() => {
        setErrorMessage("");
        setModalError(false);
      }, 3000);
      setButtonDisabled(false);
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/college/change_password`, {
        email: otpEmail,
        password: newPassword,
      })
      .then((res) => {
        setModalError(true);
        setErrorMessage(res.data.message);
        setTimeout(() => {
          setErrorMessage("");
          setModalError(false);
        }, 3000);
        setButtonDisabled(false);
        setResetPassword(0);
      })
      .catch((err) => {
        setModalError(true);
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage("");
          setModalError(false);
        }, 3000);
        setButtonDisabled(false);
        setResetPassword(0);
      });
  };

  return (
    <>
      {onSubmit ? (
        <div className="spinner">
          <InfinitySpin color="#0087ca" />
        </div>
      ) : (
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
                {/* Separation line for buttons and form */}
                <hr className="my-mb-5 separation-line" />

                {/* information for college */}
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
                          spellCheck="false"
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
                          id="input-text2"
                          required
                          value={colPassword}
                          onChange={(e) => setColPassword(e.target.value)}
                          spellCheck="false"
                        />
                        <span className="placeholder">Password</span>
                      </div>
                    </Col>
                  </Row>
                  <Row
                    className="login-forgot-password"
                    style={{ marginBottom: "12vh" }}
                    onClick={handleColModalShow}
                  >
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
                      {resetPassword === 0 && (
                        <Row style={{ marginBottom: "1vh" }}>
                          <Col className="otp-input" md={8}>
                            <input
                              style={{
                                color: "black",
                                width: "90%",
                                marginTop: "1%",
                              }}
                              type="email"
                              name="input-text"
                              id="input-text"
                              required
                              value={otpEmail}
                              onChange={(e) => setOtpEmail(e.target.value)}
                              placeholder="Enter Email"
                              spellCheck="false"
                            />
                          </Col>
                          <Col className="otp-button">
                            <Button
                              onClick={handleOTPSend}
                              disabled={buttonDisabled}
                            >
                              Send OTP
                            </Button>
                          </Col>
                        </Row>
                      )}
                      {resetPassword === 1 && (
                        <Row style={{ marginBottom: "1vh" }}>
                          <Col className="otp-input" md={8}>
                            <input
                              style={{
                                color: "black",
                                width: "90%",
                                marginTop: "1%",
                              }}
                              type="text"
                              name="input-text"
                              id="input-text"
                              required
                              value={userOtp}
                              onChange={(e) => setUserOtp(e.target.value)}
                              placeholder="Enter OTP"
                              spellCheck="false"
                            />
                          </Col>
                          <Col className="otp-button">
                            <Button
                              onClick={handleVerifyOTP}
                              disabled={buttonDisabled}
                            >
                              Verify OTP
                            </Button>
                          </Col>
                        </Row>
                      )}
                      {resetPassword === 2 && (
                        <>
                          <Row style={{ marginBottom: "1vh" }}>
                            <Col className="otp-input" md={6}>
                              <input
                                style={{
                                  color: "black",
                                  width: "100%",
                                  marginTop: "1%",
                                }}
                                type="password"
                                name="input-text"
                                id="input-text"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter Password"
                                spellCheck="false"
                              />
                            </Col>
                            <Col className="otp-input">
                              <input
                                style={{
                                  color: "black",
                                  width: "100%",
                                  marginTop: "1%",
                                }}
                                type="password"
                                name="input-text"
                                id="input-text"
                                required
                                value={confirmNewPassword}
                                onChange={(e) =>
                                  setConfirmNewPassword(e.target.value)
                                }
                                placeholder="Confirm Password"
                                spellCheck="false"
                              />
                            </Col>
                          </Row>
                          <Row className="otp-button">
                            <Button
                              style={{ marginLeft: "13vw", width: "30%" }}
                              onClick={handlePasswordReset}
                              disabled={buttonDisabled}
                            >
                              Submit
                            </Button>
                          </Row>
                        </>
                      )}
                      <div className="error-message">
                        {modalError && <p>{errorMessage}</p>}
                      </div>
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
