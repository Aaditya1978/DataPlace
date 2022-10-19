import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";
import "./Signup.css";
import "animate.css";
import axios from "axios";
import logo from "../../images/logo.png";
import front_img from "../../images/sign_up_in_front_img_4.png";
import front_img2 from "../../images/sign_up_in_front_img2.png";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import stateData from "../../utils/state.json";

export default function Signup() {
  const navigate = useNavigate();

  const [colName, setColName] = useState("");
  const [colContact, setColContact] = useState("");
  const [colEmail, setColEmail] = useState("");
  const [colAddress, setColAddress] = useState("");
  const [colDist, setColDist] = useState("--Choose District--");
  const [colState, setColState] = useState("--Choose State--");
  const [colPin, setColPin] = useState("");
  const [colPassword, setColPassword] = useState("");
  const [colConfPassword, setColConfPassword] = useState("");
  const [onColSubmit, setOnColSubmit] = useState(false);

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCollForm = (e) => {
    e.preventDefault();
    if (!/^-?\d+$/.test(colContact)) {
      setError("Contact Number should be a number");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colContact.length !== 10) {
      setError("Contact Number should be 10 digits");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPin.length !== 6) {
      setError("Pin Code should be 6 digits");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    // check if valid email
    if (
      colEmail &&
      !colEmail.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
    ) {
      setError("Invalid Email");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }

    if (colPassword !== colConfPassword) {
      setError("Password and Confirm Password should be same");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPassword.length < 6) {
      setError("Password should be atleast 6 characters");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }

    setOnColSubmit(true);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/college/register`, {
        name: colName,
        phone: colContact,
        email: colEmail,
        address: colAddress,
        state: colState,
        district: colDist,
        pincode: colPin,
        password: colPassword,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setOnColSubmit(false);
        window.history.replaceState({}, document.title, "/");
        navigate("/dashboard");
      })
      .catch((err) => {
        setOnColSubmit(false);
        setError(err.response.data.message);
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 3000);
      });
  };

  return (
    <>
      {onColSubmit ? (
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
                Already A User?
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className="login-btn hover-underline-animation"
                  onClick={handleLogin}
                >
                  Log In
                </a>
              </span>
            </div>

            {/* Credential form */}
            <div className="credentials">
              <div className="credentials-form">
                <hr className="my-mb-5 separation-line" />

                {/* information for college */}
                <Form className="my-form-1" onSubmit={handleCollForm}>
                  <Row style={{ marginBottom: "8vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text1"
                          required
                          value={colName}
                          onChange={(e) => setColName(e.target.value)}
                          spellCheck="false"
                        />
                        <span className="placeholder">College Name</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "8vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="tel"
                          name="contact_number"
                          id="contact_number"
                          required
                          value={colContact}
                          onChange={(e) => setColContact(e.target.value)}
                          inputMode="tel"
                          spellCheck="false"
                        />
                        <span className="placeholder">Contact Number</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="input-block">
                        <input
                          type="email"
                          name="input-text"
                          id="input-text2"
                          required
                          value={colEmail}
                          onChange={(e) => setColEmail(e.target.value)}
                          spellCheck="false"
                        />
                        <span className="placeholder">Email Id</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "8vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text3"
                          required
                          value={colAddress}
                          onChange={(e) => setColAddress(e.target.value)}
                          spellCheck="false"
                        />
                        <span className="placeholder">Address</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "3vh" }}>
                    <Col>
                      <Form.Select
                        style={{
                          height: "5vh",
                          outline: "none",
                          marginBottom: "0vh",
                          width: "100%",
                          overflow: "hidden",
                          borderRadius: "0.2vh solid",
                          padding: "0.2vh",
                        }}
                        value={colState}
                        onChange={(e) => setColState(e.target.value)}
                      >
                        <option disabled>--Choose State--</option>
                        {stateData.states.map((state) => (
                          <option key={state.state} value={state.state}>
                            {state.state}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select
                        onChange={(e) => setColDist(e.target.value)}
                        value={colDist}
                        style={{
                          height: "5vh",
                          outline: "none",
                          marginBottom: "0vh",
                          width: "100%",
                          overflow: "hidden",
                          borderRadius: "0.2vh solid",
                          padding: "0.2vh",
                        }}
                      >
                        <option disabled>--Choose District--</option>
                        {stateData.states
                          .filter((state) => state.state === colState)
                          .map((state) =>
                            state.districts.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))
                          )}
                      </Form.Select>
                    </Col>
                    <Col>
                      <div className="input-block">
                        <input
                          type="number"
                          name="input-text"
                          id="input-text4"
                          required
                          value={colPin}
                          onChange={(e) => setColPin(e.target.value)}
                          inputMode="numeric"
                          spellCheck="false"
                        />
                        <span className="placeholder">Pincode</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "8vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="password"
                          name="input-text"
                          id="input-text5"
                          required
                          value={colPassword}
                          onChange={(e) => setColPassword(e.target.value)}
                          spellCheck="false"
                        />
                        <span className="placeholder">Password</span>
                      </div>
                    </Col>
                    <Col>
                      <div className="input-block">
                        <input
                          type="password"
                          name="input-text"
                          id="input-text6"
                          required
                          value={colConfPassword}
                          onChange={(e) => setColConfPassword(e.target.value)}
                          spellCheck="false"
                        />
                        <span className="placeholder">Confirm Password</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "1vh" }}>
                    {isError && (
                      <div className="error-message">
                        <p>{error}</p>
                      </div>
                    )}
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        inline
                        required
                        label={
                          <div className="terms" onClick={handleModalShow}>
                            I agree to the Terms &amp; Conditions &nbsp;{" "}
                          </div>
                        }
                      />
                    </Col>
                  </Row>
                  <Modal
                    style={{ background: "none" }}
                    show={modalShow}
                    onHide={handleModalClose}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Terms And Conditions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                      <b>Email Management:</b> Your email address will only be
                      recorded if you choose to send a message. It will only be
                      used for the purpose for which you have provided it and
                      will not be added to a mailing list. Your email address
                      will not be used for any other purpose, and will not be
                      disclosed, without your consent.
                      <br />
                      <br /> <b>Collection of Personal Information:</b>
                      If you are asked for any other Personal Information you
                      will be informed how it will be used if you choose to give
                      it. If at any time you believe the principles referred to
                      in this privacy statement have not been followed, or have
                      any other comments on these principles, please notify the
                      webmaster through the contact us page.
                      <br />
                      <br /> <b>Note:</b> The use of the term "Personal
                      Information" in this privacy statement refers to any
                      information from which your identity is apparent or can be
                      reasonably ascertained.
                    </Modal.Body>
                  </Modal>
                  {/* Previous and next page */}
                  <Row style={{ marginTop: "5vh" }}>
                    <Col>
                      <Button
                        style={{ marginTop: 0 }}
                        onClick={() => navigate("/")}
                        className="close cancel-button"
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Button
                        style={{ marginTop: 0 }}
                        type="submit"
                        className="close submit-button"
                      >
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
