import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Row,
  Col,
  Carousel,
  ButtonGroup,
} from "react-bootstrap";
import Typewriter from "typewriter-effect";
import "animate.css";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { BsFacebook, BsTwitter, BsLinkedin, BsYoutube } from "react-icons/bs";
import Loader from "../Loader/Loader";
import logo from "../../images/logo.png";
import header from "../../images/header.svg";
import header2 from "../../images/header2.svg";
import header3 from "../../images/header3.svg";
import college from "../../images/college.svg";
import gov from "../../images/gov.svg";
import company from "../../images/company.svg";
import analytics from "../../images/analytics.png";
import automation from "../../images/automation.png";
import coding from "../../images/coding.png";
import review from "../../images/review.png";
import shield from "../../images/shield.png";
import transparency from "../../images/transparency.png";
import analys from "../../images/analys.svg";
import auth from "../../images/auth.svg";
import data from "../../images/data.svg";
import result from "../../images/result.svg";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const [feature, setFeature] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 10000);
  }, []);

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {/* Navbar section */}
          <Navbar collapseOnSelect className="navbar" expand="lg" sticky="top">
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="50"
                className="d-inline-block"
                alt="logo"
              />
              <span className="logo-name">DataPlace</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="home-links me-auto">
                <span>
                  <Link activeClass="active" to="home" spy={true} smooth={true}>
                    Home
                  </Link>
                </span>
                <span>
                  <Link to="feature" spy={true} smooth={true}>
                    Features
                  </Link>
                </span>
                <span>
                  <Link to="process" spy={true} smooth={true}>
                    Process
                  </Link>
                </span>
                <span>
                  <Link to="about" spy={true} smooth={true}>
                    About
                  </Link>
                </span>
                <span>
                  <Link to="contact" spy={true} smooth={true}>
                    Contact
                  </Link>
                </span>
              </Nav>
              <Nav className="nav-button">
                <Button className="signup-btn" onClick={handleSignup}>
                  Sign Up
                </Button>
                <Button className="login-btn" onClick={handleLogin}>
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* Home / Header section */}
          <div className="home" name="home">
            <Container>
              <Row>
                <Col
                  lg={6}
                  md={6}
                  className="animate__animated animate__bounceInRight"
                >
                  <Carousel controls={false}>
                    <Carousel.Item interval={1000}>
                      <img
                        className="d-block w-100"
                        src={header}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block w-100"
                        src={header2}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block w-100"
                        src={header3}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </Col>
                <Col
                  lg={6}
                  md={6}
                  className="animate__animated animate__bounceInLeft"
                >
                  <div className="home-header">DATAPLACE</div>
                  <div className="home-content">
                    <Typewriter
                      options={{
                        strings: [
                          "DataPlace is a platform built for managing placements data in a secure way at one place. The data collected is used to generate reports and to provide insights to the recruiters and government agencies.",
                          "DataPlace provides colleges a platform to upload their placements data and to view the data collected by other colleges. The data collected is used to generate reports and to provide insights to the recruiters and government agencies.",
                          "DataPlace generated reposts using machine learning algorithms to provide insights to the recruiters and government agencies and allow them to make better decisions.",
                        ],
                        autoStart: true,
                        delay: 10,
                        deleteSpeed: 10,
                        pauseFor: 5000,
                        loop: true,
                      }}
                    />
                  </div>
                  <Button className="explore-btn" onClick={handleSignup}>
                    Explore
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Features section */}
          <div className="feature" name="feature">
            <div className="heading">FEATURES</div>
            <div className="feature-bar">
              <ButtonGroup size="lg" className="mb-2">
                <Button
                  className={feature === 0 ? "active" : ""}
                  onClick={() => setFeature(0)}
                >
                  College
                </Button>
                <Button
                  className={feature === 1 ? "active" : ""}
                  onClick={() => setFeature(1)}
                >
                  Government
                </Button>
                <Button
                  className={feature === 2 ? "active" : ""}
                  onClick={() => setFeature(2)}
                >
                  Corporate
                </Button>
              </ButtonGroup>
            </div>
            {feature === 0 && (
              <div className="f-college animate__animated animate__bounceInLeft">
                <Container>
                  <Row>
                    <Col lg={4} md={4}>
                      <img src={college} alt="college" />
                    </Col>
                    <Col lg={8} md={8} className="f-college-content">
                      <div className="f-college-heading">COLLEGE</div>
                      <div className="f-college-text">
                        <ul>
                          <li>
                            Easily upload your placements data and view the data
                          </li>
                          <li>
                            Generate reports and insights to the recruiters and
                            government agencies.
                          </li>
                          <li>
                            Get to know about various policies and regulations
                            helping you to make better decisions.
                          </li>
                          <li>
                            Helps in getting weaker areas / branches to focus on
                            and compare with other colleges.
                          </li>
                          <li>
                            Helps in hilighting the problems and issues that
                            need to be addressed.
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
            {feature === 1 && (
              <div className="f-gov animate__animated animate__bounceInRight">
                <Container>
                  <Row>
                    <Col lg={4} md={4}>
                      <img src={gov} alt="government" />
                    </Col>
                    <Col lg={8} md={8} className="f-gov-content">
                      <div className="f-gov-heading">GOVERNMENT</div>
                      <div className="f-gov-text">
                        <ul>
                          <li>
                            Helps in centeralizing the data collected by various
                            departments and agencies.
                          </li>
                          <li>
                            Generates reports and insights about areas to be
                            focused on and compare on the bases of location,
                            branches and other factors.
                          </li>
                          <li>
                            Compare colleges on basis of ranks and other factors
                            to get to know about the areas of development.
                          </li>
                          <li>
                            Sort colleges on various factors like employement vs
                            unemployment rate, average package, field of
                            eduction etc.
                          </li>
                          <li>
                            Easily notify about various policies and regulations
                            helping you to make better decisions.
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
            {feature === 2 && (
              <div className="f-company animate__animated animate__bounceInLeft">
                <Container>
                  <Row>
                    <Col lg={4} md={4}>
                      <img src={company} alt="company" />
                    </Col>
                    <Col lg={8} md={8} className="f-company-content">
                      <div className="f-company-heading">CORPORATE</div>
                      <div className="f-company-text">
                        <ul>
                          <li>
                            Easily find the best talent for your company based
                            on location, desired branch and other factors.
                          </li>
                          <li>
                            Evaluate on the basis of previous placements and
                            other factors to get to know about the areas of
                            interest.
                          </li>
                          <li>
                            Easily notify the best colleges for campus
                            placements and other events.
                          </li>
                          <li>
                            Enable hiring posts and our recommender system will
                            notify best colleges for your hiring posts.
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
            <div className="f-cards">
              <Container>
                <Row>
                  <Col lg={4} md={4} className="f-card">
                    <div className="f-card-icon">
                      <img src={analytics} alt="analytics" />
                    </div>
                    <div className="f-card-heading">Analytics</div>
                    <div className="f-card-text">
                      At DataPlace, we use machine learning algorithms to
                      generate reports and insights based on the data collected
                      by colleges. These reports are used to help you make
                      better decisions.
                    </div>
                  </Col>
                  <Col lg={4} md={4} className="f-card">
                    <div className="f-card-icon">
                      <img src={automation} alt="automation" />
                    </div>
                    <div className="f-card-heading">Automation</div>
                    <div className="f-card-text">
                      All the Data collection process is automated and
                      streamlined. You can upload your data in a single click.
                      And get insights and reports in no time.
                    </div>
                  </Col>
                  <Col lg={4} md={4} className="f-card">
                    <div className="f-card-icon">
                      <img src={shield} alt="shield" />
                    </div>
                    <div className="f-card-heading">Security</div>
                    <div className="f-card-text">
                      We use advanced security measures to protect your data. We
                      use industry standard encryption and data security
                      measures to ensure the safety of your data. The data is
                      stored in a secured cloud storage.
                    </div>
                  </Col>
                  <Col lg={4} md={4} className="f-card">
                    <div className="f-card-icon">
                      <img src={review} alt="review" />
                    </div>
                    <div className="f-card-heading">Scoring</div>
                    <div className="f-card-text">
                      We use advanced scoring system to evaluate the colleges
                      based on various factors like employement vs unemployment
                      rate, average package, field of eduction etc.
                    </div>
                  </Col>
                  <Col lg={4} md={4} className="f-card">
                    <div className="f-card-icon">
                      <img src={transparency} alt="transparency" />
                    </div>
                    <div className="f-card-heading">Transparency</div>
                    <div className="f-card-text">
                      The Data transparency is ensured by the DataPlace team.
                      The data collected is first filterd and then stored in a
                      organized manner. And the results are shown without any
                      manipulation to the users.
                    </div>
                  </Col>
                  <Col lg={4} md={4} className="f-card">
                    <div className="f-card-icon">
                      <img src={coding} alt="coding" />
                    </div>
                    <div className="f-card-heading">Machine Learning</div>
                    <div className="f-card-text">
                      We use machine learning algorithms which are regularly
                      updated to generate reports and insights based on the data
                      collected by colleges. These algorithms are trained on a
                      very large dataset of colleges.
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>

          {/* Process Section */}
          <div className="process" name="process">
            <div className="process-heading">PROCESS</div>
            <Container>
              <Row className="p-row">
                <Col lg={4} md={4}>
                  <img src={auth} alt="authentication" />
                </Col>
                <Col lg={8} md={9} className="process-text">
                  <div>
                    First, you need to register with us. Then you can start
                    uploading your data. The authentication process is very
                    simple and easy. And can be done without any hassle.
                  </div>
                </Col>
              </Row>
              <Row className="p-row">
                <Col lg={8} md={9} className="process-text">
                  <div>
                    After the authentication, you can upload your data in a
                    single click. The data is uploaded in a secure manner and is
                    stored in a secured cloud storage. You will also be notified
                    about the status of the data upload.
                  </div>
                </Col>
                <Col lg={4} md={4}>
                  <img src={data} alt="data" />
                </Col>
              </Row>
              <Row className="p-row">
                <Col lg={4} md={4}>
                  <img src={analys} alt="analytics" />
                </Col>
                <Col lg={8} md={9} className="process-text">
                  <div>
                    After the data is uploaded, we use machine learning
                    algorithms to generate reports and insights based on the
                    data collected by colleges. These reports are used to help
                    you make better decisions.
                  </div>
                </Col>
              </Row>
              <Row className="p-row">
                <Col lg={8} md={9} className="process-text">
                  <div>
                    The DataPlace team uses advanced scoring system to evaluate
                    the colleges based on various factors like employement vs
                    unemployment rate, average package, field of eduction etc.
                  </div>
                </Col>
                <Col lg={4} md={4}>
                  <img src={result} alt="result" />
                </Col>
              </Row>
            </Container>
          </div>

          {/* About Section */}
          <div className="about" name="about">
            <div className="about-heading">STATS</div>
            <Container>
              <Row className="a-row">
                <Col lg={4} md={4} className="a-card">
                  <CountUp start={0} end={100} suffix="+" duration="1">
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <div className="heading" ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                  <div className="sub-heading">Colleges Registered</div>
                </Col>
                <Col lg={4} md={4} className="a-card">
                  <CountUp start={0} end={1500} suffix="+" duration="1">
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <div className="heading" ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                  <div className="sub-heading">Students Data</div>
                </Col>
                <Col lg={4} md={4} className="a-card">
                  <CountUp start={0} end={20} suffix="+" duration="1">
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <div className="heading" ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                  <div className="sub-heading">Years of Data</div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* footer section */}
          <div className="footer" name="contact">
            <Container>
              <Row>
                <Col lg={3} md={3} sm={12}>
                  <Row>
                    <Col className="footer-main">
                      <div className="footer-logo">
                        <img src={logo} alt="logo" />
                        <span>DataPlace</span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={3} md={3} sm={6} className="link">
                  <div className="head">Useful Links</div>
                  <div className="links">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#process">Process</a>
                    <a href="#contact">Contact</a>
                  </div>
                </Col>
                <Col lg={3} md={3} sm={6} className="link">
                  <div className="head">Company</div>
                  <div className="links">
                    <a href="#1">About Us</a>
                    <a href="#2">Contact Us</a>
                    <a href="#3">Careers</a>
                    <a href="#4">Privacy Policy</a>
                  </div>
                </Col>
                <Col lg={3} md={3} sm={6} className="link">
                  <div className="head">Social Links</div>
                  <div className="links">
                    <a href="#1">
                      <BsFacebook /> Facebook
                    </a>
                    <a href="#2">
                      <BsTwitter /> Twitter
                    </a>
                    <a href="#3">
                      <BsLinkedin /> Linkedin
                    </a>
                    <a href="#4">
                      <BsYoutube /> Youtube
                    </a>
                  </div>
                </Col>
              </Row>
              <Row className="copy">
                Copyright &copy; {new Date().getFullYear()} DataPlace
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
