import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import "./Signup.scss";
import logo from "../../images/logo.png";
// import sign_up_in_background from "../../images/sign_up_in_background_4.jpg";
import front_img from "../../images/sign_up_in_front_img_4.png";
import front_img2 from "../../images/sign_up_in_front_img2.png";
import {
  Button,
  Container,
  Row,
  Col,
  Carousel,
  ButtonGroup,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

export default function Signup() {
  const navigate = useNavigate();
  const [feature, setFeature] = useState(0);
  const [corpName, setCorpName] = useState("");
  const [corpWeb, setCorpWeb] = useState("");
  const [corpContact, setCorpContact] = useState("");
  const [corpEmail, setCorpEmail] = useState("");
  const [corpAddress, setCorpAddress] = useState("");
  const [corpCity, setCorpCity] = useState("");
  const [corpState, setCorpState] = useState("--Choose State--");
  const [corpPin, setCorpPin] = useState("");
  const [corpPassword, setCorpPassword] = useState("");
  const [corpConfPassword, setCorpConfPassword] = useState("");

  const [colName, setColName] = useState("");
  const [colWeb, setColWeb] = useState("");
  const [colContact, setColContact] = useState("");
  const [colEmail, setColEmail] = useState("");
  const [colAddress, setColAddress] = useState("");
  const [colCity, setColCity] = useState("");
  const [colState, setColState] = useState("--Choose State--");
  const [colPin, setColPin] = useState("");
  const [colPassword, setColPassword] = useState("");
  const [colConfPassword, setColConfPassword] = useState("");
  const [colId, setColId] = useState("");

  const handleLogin = () => {
    navigate("/login");
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
              Already A User?
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
                <Form className="my-form-1" onSubmit={() => setFeature(3)}>
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          spellcheck="false"
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
                          spellcheck="false"
                        />
                        <span className="placeholder">Company Website</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="tel"
                          name="contact_number"
                          id="contact_number"
                          inputmode="numeric"
                          required
                          pattern="[0-9]{10}"
                          value={corpContact}
                          onChange={(e) => setCorpContact(e.target.value)}
                          spellcheck="false"
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
                          value={corpEmail}
                          onChange={(e) => setCorpEmail(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Email Id</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          value={corpAddress}
                          onChange={(e) => setCorpAddress(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Address</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          value={corpCity}
                          onChange={(e) => setCorpCity(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">City</span>
                      </div>
                    </Col>
                    {/* <Col>
                      <Form.Select
                        onChange={(e) => setCorpState(e.target.value)}
                        defaultValue="--Choose State--"
                        value={corpState}
                      >
                        <option selected disabled>
                          --Choose State--
                        </option>
                        <option>Andaman and Nicobar (UT)</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chandigarh (UT)</option>
                        <option>Chhattisgarh</option>
                        <option>Dadra and Nagar Haveli (UT)</option>
                        <option>Daman and Diu (UT)</option>
                        <option>Delhi</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>jammu and Kashmir</option>
                        <option>Jharkhand</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Ladakh</option>
                        <option>Lakshadweep (UT)</option>
                        <option>Madhya Pradesh</option>
                        <option>Maharashtra</option>
                        <option>Manipur</option>
                        <option>Meghalaya</option>
                        <option>Mizoram</option>
                        <option>Nagaland</option>
                        <option>Orissa</option>
                        <option>Puducherry (UT)</option>
                        <option>Punjab</option>
                        <option>Rajasthan</option>
                        <option>Sikkim</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Tripura</option>
                        <option>Uttar Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>West Bengal</option>
                      </Form.Select>
                    </Col> */}
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          value={corpPin}
                          onChange={(e) => setCorpPin(e.target.value)}
                          inputmode="numeric"
                          pattern="^[0-9]{6}$"
                          spellcheck="false"
                        />
                        <span className="placeholder">Pincode</span>
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
                        Next
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}

              {/* information for college */}
              {feature === 1 && (
                <Form className="my-form-1" onSubmit={() => setFeature(2)}>
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          value={colName}
                          onChange={(e) => setColName(e.target.value)}
                          spellcheck="false"
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
                          spellcheck="false"
                        />
                        <span className="placeholder">College Website</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="tel"
                          name="contact_number"
                          id="contact_number"
                          required
                          value={colContact}
                          onChange={(e) => setColContact(e.target.value)}
                          inputmode="numeric"
                          pattern="[0-9]{10}"
                          // spellcheck="false"
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
                          spellcheck="false"
                        />
                        <span className="placeholder">Email Id</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          value={colAddress}
                          onChange={(e) => setColAddress(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Address</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "10vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          value={colCity}
                          onChange={(e) => setColCity(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">City</span>
                      </div>
                    </Col>
                    <Col>
                      <Form.Select
                        style={{
                          height: "5vh",
                          fontSize: "1.8vh",
                          outline: "none",
                          marginBottom: "0vh",
                          width: "100%",
                          overflow: "hidden",
                          borderRadius: "0.2vh solid",
                          padding: "0vh",
                        }}
                        value={colState}
                        onChange={(e) => setColState(e.target.value)}
                        defaultValue="--Choose State--"
                      >
                        <option selected disabled>
                          --Choose State--
                        </option>
                        <option>Andaman and Nicobar (UT)</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chandigarh (UT)</option>
                        <option>Chhattisgarh</option>
                        <option>Dadra and Nagar Haveli (UT)</option>
                        <option>Daman and Diu (UT)</option>
                        <option>Delhi</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>jammu and Kashmir</option>
                        <option>Jharkhand</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Ladakh</option>
                        <option>Lakshadweep (UT)</option>
                        <option>Madhya Pradesh</option>
                        <option>Maharashtra</option>
                        <option>Manipur</option>
                        <option>Meghalaya</option>
                        <option>Mizoram</option>
                        <option>Nagaland</option>
                        <option>Orissa</option>
                        <option>Puducherry (UT)</option>
                        <option>Punjab</option>
                        <option>Rajasthan</option>
                        <option>Sikkim</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Tripura</option>
                        <option>Uttar Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>West Bengal</option>
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
                          inputmode="numeric"
                          pattern="^[0-9]{6}$"
                          spellcheck="false"
                        />
                        <span className="placeholder">Pincode</span>
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
                        Next
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}

              {feature === 2 && (
                <Form className="my-form-1">
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
                        <input
                          type="text"
                          name="input-text"
                          id="input-text"
                          required
                          value={colId}
                          onChange={(e) => setColId(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">College Id</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
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
                    <Col>
                      <div className="input-block">
                        <input
                          type="password"
                          name="input-text"
                          id="input-text"
                          required
                          value={colConfPassword}
                          onChange={(e) => setColConfPassword(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Conf Password</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "19vh" }}>
                    <Col>
                      <Form.Group controlId="formFile">
                        <Form.Control
                          style={{
                            height: "5vh",
                            padding: "0vh",
                            fontSize: "2.8vh",
                          }}
                          required
                          type="file"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Check
                        style={{ fontSize: "2.5vh", position: "absolute" }}
                        inline
                        label="I agree to the terms and conditions"
                      />
                    </Col>
                  </Row>
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
                <Form className="my-form-1">
                  <Row style={{ marginBottom: "7vh" }}>
                    <Col>
                      <div className="input-block">
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
                    <Col>
                      <div className="input-block">
                        <input
                          type="password"
                          name="input-text"
                          id="input-text"
                          required
                          value={corpConfPassword}
                          onChange={(e) => setCorpConfPassword(e.target.value)}
                          spellcheck="false"
                        />
                        <span className="placeholder">Conf Password</span>
                      </div>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "24vh" }}>
                    <Col>
                      <Form.Group controlId="formFile" className="my-mb-3">
                        <Form.Control required type="file" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col>
                      <Form.Check
                        inline
                        label="I agree to the terms and conditions"
                      />
                    </Col>
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
