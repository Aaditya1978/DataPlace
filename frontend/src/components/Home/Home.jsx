import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from "react-icons/fa";
import logo from "../../images/logo.png";
import header_image from "../../images/header_image.png";
import gov_image from "../../images/gov_image.png";
import company_image from "../../images/company_image.png";
import college_image from "../../images/college-image.png";
import "./Home.css";

export default function Home() {

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  }

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <div className="home">
      {/* navbar component */}
      <div className="nav">
        <Button className="nav-b login-b" onClick={handleLogin}>Login</Button>
        <Button className="nav-b sign-b" onClick={handleSignup}>Sign Up</Button>
      </div>

      {/* logo div */}
      <div className="main-logo">
        <img src={logo} alt="logo" draggable="false" />
      </div>

      {/* header section */}
      <div className="header">
        <div className="header-text">
          DataPlace is a platfrom which connects the colleges, government and
          corporates at one place and uses the placements data of various
          technical institutes in India.
        </div>
        <div className="header-image">
          <img src={header_image} alt="header" draggable="false" />
        </div>
      </div>

      {/* main content section */}
      <div className="home-content">
        <Row className="content-row">
          <Col className="content-img">
            <img src={gov_image} alt="government" draggable="false" />
          </Col>
          <Col sm={12} lg={6} md={4} className="content-body">
            <div className="content-header">Government</div>
            <div className="content-text">
              Access details of government along with the benifits they can get
              by using dataplace.
              <br /> BENIFITS : Reduction in unemoployment, Policy making,
              employment vs unemployement ratio, promote startups etc.
            </div>
          </Col>
        </Row>
        <Row className="content-row">
          <Col sm={12} lg={6} md={4} className="content-body">
            <div className="content-header">College</div>
            <div className="content-text">
              Access details of college along with the benifits they can get by
              using dataplace.
              <br /> BENIFITS: Maintenance of data, promotion of college,
              benificial for students, improvement in placmement records etc.
            </div>
          </Col>
          <Col className="content-img">
            <img src={college_image} alt="college" draggable="false" />
          </Col>
        </Row>
        <Row className="content-row">
          <Col className="content-img">
            <img src={company_image} alt="company" draggable="false" />
          </Col>
          <Col sm={12} lg={6} md={4} className="content-body">
            <div className="content-header">Corporate</div>
            <div className="content-text">
              Access details of corporate along with the benifits they can get
              by using dataplace.
              <br /> BENIFITS: Instantaneous/easy hiring, reduce cost of hiring,
              easy to find talent for a particular field in particular location
              etc.
            </div>
          </Col>
        </Row>
      </div>

      {/* footer section */}
      <div className="footer">
        <Row>
          <Col className="footer-section">
            <div className="footer-header">About Us</div>
            <div className="footer-text">
              DataPlace is a platform which connects the colleges, government
              and corporates at one place and uses the placements data of
              various technical institutes in India.
              <br />
              <br />
              Copyright © 2022 DataPlace. All rights reserved.
            </div>
          </Col>
          <Col className="footer-section">
            <div className="footer-header">Quick Links</div>
            <div className="footer-text footer-links">
              <a href="/">Home</a>
              <a href="/">About Us</a>
              <a href="/">Contact Us</a>
              <a href="/">Privacy Policy</a>
            </div>
          </Col>
          <Col className="footer-section">
            <div className="footer-header">Social Links</div>
            <div className="footer-text social-links">
              <a href="https://www.facebook.com/officialaicte" target="_blank" rel="noopener noreferrer">
                <FaFacebookSquare className="footer-icon" size={"1.4em"} /> Facebook
              </a>
              <a href="https://twitter.com/AICTE_INDIA" target="_blank" rel="noopener noreferrer">
                <FaTwitterSquare className="footer-icon" size={"1.4em"} /> Twitter
              </a>
              <a href="https://twitter.com/AICTE_INDIA" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="footer-icon" size={"1.4em"} /> Linkedin
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
