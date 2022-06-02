import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.scss";
import "./Signup.css";
import "animate.css";
import axios from "axios";
import logo from "../../images/logo.png";
import front_img from "../../images/sign_up_in_front_img_4.png";
import front_img2 from "../../images/sign_up_in_front_img2.png";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button, Row, Col, Form, Modal } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import stateData from "../../utils/state.json";

export default function Signup() {
  const navigate = useNavigate();
  const [feature, setFeature] = useState(0);
  const [corpName, setCorpName] = useState("");
  const [corpWeb, setCorpWeb] = useState("");
  const [corpContact, setCorpContact] = useState("");
  const [corpEmail, setCorpEmail] = useState("");
  const [corpAddress, setCorpAddress] = useState("");
  const [corpDist, setCorpDist] = useState("");
  const [corpState, setCorpState] = useState("--Choose State--");
  const [corpPin, setCorpPin] = useState("");
  const [corpPassword, setCorpPassword] = useState("");
  const [corpConfPassword, setCorpConfPassword] = useState("");
  const [corpFile, setCorpFile] = useState("");
  const [onCorpSubmit, setOnCorpSubmit] = useState(false);

  const [colName, setColName] = useState("");
  const [colWeb, setColWeb] = useState("");
  const [colContact, setColContact] = useState("");
  const [colEmail, setColEmail] = useState("");
  const [colAddress, setColAddress] = useState("");
  const [colDist, setColDist] = useState("");
  const [colState, setColState] = useState("--Choose State--");
  const [colPin, setColPin] = useState("");
  const [colPassword, setColPassword] = useState("");
  const [colConfPassword, setColConfPassword] = useState("");
  const [colId, setColId] = useState("");
  const [colFile, setColFile] = useState("");
  const [onColSubmit, setOnColSubmit] = useState(false);

  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);

  const [modalShow2, setModalShow2] = useState(false);

  const handleModalShow2 = () => setModalShow2(true);
  const handleModalClose2 = () => setModalShow2(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCorpForm1 = (e) => {
    e.preventDefault();
    if (!/^-?\d+$/.test(corpContact)) {
      setError("Contact Number should be a number");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (corpContact.length !== 10) {
      setError("Contact Number should be 10 digits");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (!/^-?\d+$/.test(corpPin)) {
      setError("Pin Code should be a number");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }

    if (corpPin.length !== 6) {
      setError("Pin Code should be 6 digits");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    // check if valid website url
    if (corpWeb && !corpWeb.match(/^(?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+$/)) {
      setError("Invalid Website URL");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    // check if valid email
    if (
      corpEmail &&
      !corpEmail.match(
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
    setFeature(3);
  };

  const handleCollForm1 = (e) => {
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
    if (!/^-?\d+$/.test(colPin)) {
      setError("Pin Code should be a number");
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
    // check if valid website url
    if (colWeb && !colWeb.match(/^(?:https?:\/\/)?[\w-]+(?:\.[\w-]+)+$/)) {
      setError("Invalid Website URL");
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
    setFeature(2);
  };

  const handleCorpFile = (e) => {
    setCorpFile(e.target.files[0]);
  };

  const handleCorpSubmit = (e) => {
    e.preventDefault();
    if (corpPassword !== corpConfPassword) {
      setError("Password and Confirm Password should be same");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (corpPassword.length < 8) {
      setError("Password should be atleast 8 characters");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (corpPassword.length > 20) {
      setError("Password should be less than 20 characters");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (corpPassword.search(/[a-z]/) < 0) {
      setError("Password should contain atleast one lowercase letter");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (corpPassword.search(/[A-Z]/) < 0) {
      setError("Password should contain atleast one uppercase letter");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (corpPassword.search(/[0-9]/) < 0) {
      setError("Password should contain atleast one number");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (corpPassword.search(/[!@#$%^&*]/) < 0) {
      setError("Password should contain atleast one special character");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }

    setOnCorpSubmit(true);

    const formData = new FormData();
    formData.append("type", "signup");
    formData.append("name", corpName);
    formData.append("email", corpEmail);
    formData.append("website", corpWeb);
    formData.append("password", corpPassword);
    formData.append("contact", corpContact);
    formData.append("address", corpAddress);
    formData.append("state", corpState);
    formData.append("district", corpDist);
    formData.append("pincode", corpPin);
    formData.append("verification_doc", corpFile);
    formData.append("verification_doc_name", corpFile.name);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/corp_user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setOnCorpSubmit(false);
        window.history.replaceState({}, document.title, "/");
        navigate("/dashboard");
      })
      .catch((err) => {
        setOnCorpSubmit(false);
        setError(err.response.data.error);
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 3000);
      });
  };

  const handleColFile = (e) => {
    setColFile(e.target.files[0]);
  };

  const handleColSubmit = (e) => {
    e.preventDefault();
    if (colPassword !== colConfPassword) {
      setError("Password and Confirm Password should be same");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPassword.length < 8) {
      setError("Password should be atleast 8 characters");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPassword.length > 20) {
      setError("Password should be less than 20 characters");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPassword.search(/[a-z]/) < 0) {
      setError("Password should contain atleast one lowercase letter");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPassword.search(/[A-Z]/) < 0) {
      setError("Password should contain atleast one uppercase letter");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPassword.search(/[0-9]/) < 0) {
      setError("Password should contain atleast one number");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }
    if (colPassword.search(/[!@#$%^&*]/) < 0) {
      setError("Password should contain atleast one special character");
      setIsError(true);
      setTimeout(() => {
        setError("");
        setIsError(false);
      }, 3000);
      return;
    }

    setOnColSubmit(true);

    const formData = new FormData();
    formData.append("type", "signup");
    formData.append("name", colName);
    formData.append("email", colEmail);
    formData.append("website", colWeb);
    formData.append("password", colPassword);
    formData.append("contact", colContact);
    formData.append("address", colAddress);
    formData.append("state", colState);
    formData.append("district", colDist);
    formData.append("pincode", colPin);
    formData.append("verification_doc", colFile);
    formData.append("verification_doc_name", colFile.name);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/coll_user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setOnColSubmit(false);
        window.history.replaceState({}, document.title, "/");
        navigate("/dashboard");
      })
      .catch((err) => {
        setOnColSubmit(false);
        setError(err.response.data.error);
        setIsError(true);
        setTimeout(() => {
          setError("");
          setIsError(false);
        }, 3000);
      });
  };

  return (
    <>
      {onCorpSubmit || onColSubmit ? (
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
                {(feature === 0 || feature === 1) && (
                  <div className="user-selection my-mb-4">
                    <div className="upper-button">
                      <Button
                        className={
                          feature === 0
                            ? "up active activate-button"
                            : "up activate-button"
                        }
                        onClick={() => setFeature(0)}
                      >
                        Sign Up As Corporate
                      </Button>
                      <Button
                        className={
                          feature === 1
                            ? "up active activate-button"
                            : "up activate-button"
                        }
                        onClick={() => setFeature(1)}
                      >
                        Sign Up As College
                      </Button>
                    </div>
                  </div>
                )}
                <hr className="my-mb-5 separation-line" />
                {feature === 0 && (
                  <Form className="my-form-1" onSubmit={handleCorpForm1}>
                    <Row style={{ marginBottom: "8vh" }}>
                      <Col>
                        <div className="input-block">
                          <input
                            type="text"
                            name="input-text"
                            id="input-text"
                            required
                            spellCheck="false"
                            value={corpName}
                            onChange={(e) => setCorpName(e.target.value)}
                          />
                          <span className="placeholder">Company Name</span>
                        </div>
                      </Col>
                      <Col>
                        <div className="input-block">
                          <input
                            type="text"
                            name="input-text"
                            id="input-text"
                            required
                            value={corpWeb}
                            onChange={(e) => setCorpWeb(e.target.value)}
                            spellCheck="false"
                          />
                          <span className="placeholder">Company Website</span>
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
                            inputMode="tel"
                            required
                            value={corpContact}
                            onChange={(e) => setCorpContact(e.target.value)}
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
                            id="input-text"
                            required
                            inputMode="email"
                            value={corpEmail}
                            onChange={(e) => setCorpEmail(e.target.value)}
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
                            id="input-text"
                            required
                            value={corpAddress}
                            onChange={(e) => setCorpAddress(e.target.value)}
                            spellCheck="false"
                          />
                          <span className="placeholder">Address</span>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "1vh" }}>
                      <Col>
                        <Form.Select
                          onChange={(e) => setCorpState(e.target.value)}
                          value={corpState}
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
                          onChange={(e) => setCorpDist(e.target.value)}
                          value={corpDist}
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
                            .filter((state) => state.state === corpState)
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
                            name="input-text"
                            id="input-text"
                            required
                            value={corpPin}
                            onChange={(e) => setCorpPin(e.target.value)}
                            inputMode="numeric"
                            pattern="^[0-9]{6}$"
                            spellCheck="false"
                          />
                          <span className="placeholder">Pincode</span>
                        </div>
                      </Col>
                    </Row>

                    <Row style={{ marginBottom: "2vh" }}>
                      {isError && (
                        <div className="error-message">
                          <p>{error}</p>
                        </div>
                      )}
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
                          Next
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}

                {/* information for college */}
                {feature === 1 && (
                  <Form className="my-form-1" onSubmit={handleCollForm1}>
                    <Row style={{ marginBottom: "8vh" }}>
                      <Col>
                        <div className="input-block">
                          <input
                            type="text"
                            name="input-text"
                            id="input-text"
                            required
                            value={colName}
                            onChange={(e) => setColName(e.target.value)}
                            spellCheck="false"
                          />
                          <span className="placeholder">College Name</span>
                        </div>
                      </Col>
                      <Col>
                        <div className="input-block">
                          <input
                            type="text"
                            name="input-text"
                            id="input-text"
                            required
                            value={colWeb}
                            onChange={(e) => setColWeb(e.target.value)}
                            spellCheck="false"
                          />
                          <span className="placeholder">College Website</span>
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
                            id="input-text"
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
                            id="input-text"
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
                            type="text"
                            name="input-text"
                            id="input-text"
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

                    <Row style={{ marginBottom: "1vh" }}>
                      {isError && (
                        <div className="error-message">
                          <p>{error}</p>
                        </div>
                      )}
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
                          Next
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}

                {feature === 2 && (
                  <Form className="my-form-1" onSubmit={handleColSubmit}>
                    <Row style={{ marginBottom: "8vh" }}>
                      <Col>
                        <div className="input-block">
                          <input
                            type="text"
                            name="input-text"
                            id="input-text"
                            required
                            value={colId}
                            onChange={(e) => setColId(e.target.value)}
                            spellCheck="false"
                          />
                          <span className="placeholder">College Id</span>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "8vh" }}>
                      <Col>
                        <div className="input-block">
                          <input
                            type="password"
                            name="input-text"
                            id="input-text"
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
                            id="input-text"
                            required
                            value={colConfPassword}
                            onChange={(e) => setColConfPassword(e.target.value)}
                            spellCheck="false"
                          />
                          <span className="placeholder">Confirm Password</span>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "10vh" }}>
                      <Col>
                        <label className="mytooltip">
                          Upload Verification Document &nbsp;{" "}
                          <AiOutlineInfoCircle className="info-icon" />
                          <span className="tooltiptext">
                            Upload a Document that can be verified as College
                            for your account to be activated.
                          </span>
                        </label>
                        <Form.Group controlId="formFile">
                          <Form.Control
                            style={{
                              height: "5vh",
                              padding: "0vh",
                              fontSize: "2.8vh",
                            }}
                            required
                            type="file"
                            onChange={handleColFile}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "2vh" }}>
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
                            <div className="terms" onClick={handleModalShow2}>
                              I agree to the Terms &amp; Conditions &nbsp;{" "}
                            </div>
                          }
                        />
                      </Col>
                    </Row>
                    <Modal
                      style={{ background: "none" }}
                      show={modalShow2}
                      onHide={handleModalClose2}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Terms And Conditions</Modal.Title>
                      </Modal.Header>
                      <Modal.Body style={{ color: "black" }}>
                        <b>Email Management:</b> Your email address will only be
                        recorded if you choose to send a message. It will only
                        be used for the purpose for which you have provided it
                        and will not be added to a mailing list. Your email
                        address will not be used for any other purpose, and will
                        not be disclosed, without your consent.
                        <br />
                        <br /> <b>Collection of Personal Information:</b>
                        If you are asked for any other Personal Information you
                        will be informed how it will be used if you choose to
                        give it. If at any time you believe the principles
                        referred to in this privacy statement have not been
                        followed, or have any other comments on these
                        principles, please notify the webmaster through the
                        contact us page.
                        <br />
                        <br /> <b>Note:</b> The use of the term "Personal
                        Information" in this privacy statement refers to any
                        information from which your identity is apparent or can
                        be reasonably ascertained.
                      </Modal.Body>
                    </Modal>
                    {/* Previous and next page */}
                    <Row style={{ marginTop: "8vh" }}>
                      <Col>
                        <Button
                          style={{ marginTop: 0 }}
                          onClick={() => setFeature(1)}
                          className="close cancel-button"
                        >
                          Back
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
                )}

                {/* Area to provide further details */}
                {feature === 3 && (
                  <Form className="my-form-1" onSubmit={handleCorpSubmit}>
                    <Row style={{ marginBottom: "8vh" }}>
                      <Col>
                        <div className="input-block">
                          <input
                            type="password"
                            name="input-text"
                            id="input-text"
                            required
                            value={corpPassword}
                            onChange={(e) => setCorpPassword(e.target.value)}
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
                            id="input-text"
                            required
                            value={corpConfPassword}
                            onChange={(e) =>
                              setCorpConfPassword(e.target.value)
                            }
                            spellCheck="false"
                          />
                          <span className="placeholder">Confirm Password</span>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "14vh" }}>
                      <Col>
                        <label className="mytooltip">
                          Upload Verification Document &nbsp;{" "}
                          <AiOutlineInfoCircle className="info-icon" />
                          <span className="tooltiptext">
                            Upload a Document that can be verified as company
                            for your account to be activated.
                          </span>
                        </label>
                        <Form.Group controlId="formFile" className="my-mb-3">
                          <Form.Control
                            required
                            type="file"
                            onChange={handleCorpFile}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-5">
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
                        recorded if you choose to send a message. It will only
                        be used for the purpose for which you have provided it
                        and will not be added to a mailing list. Your email
                        address will not be used for any other purpose, and will
                        not be disclosed, without your consent.
                        <br />
                        <br /> <b>Collection of Personal Information:</b>
                        If you are asked for any other Personal Information you
                        will be informed how it will be used if you choose to
                        give it. If at any time you believe the principles
                        referred to in this privacy statement have not been
                        followed, or have any other comments on these
                        principles, please notify the webmaster through the
                        contact us page.
                        <br />
                        <br /> <b>Note:</b> The use of the term "Personal
                        Information" in this privacy statement refers to any
                        information from which your identity is apparent or can
                        be reasonably ascertained.
                      </Modal.Body>
                    </Modal>

                    <Row style={{ marginBottom: "2vh" }}>
                      {isError && (
                        <div className="error-message">
                          <p>{error}</p>
                        </div>
                      )}
                    </Row>

                    {/* Previous and next page */}
                    <Row style={{ marginTop: "5vh" }}>
                      <Col>
                        <Button
                          style={{ marginTop: 0 }}
                          onClick={() => setFeature(0)}
                          className="close cancel-button"
                        >
                          Back
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
