import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import about_head_img from "../../images/about.svg";
import { HiMail } from "react-icons/hi";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import "./About.scss";

export default function About() {
  const navigate = useNavigate();

  const [college, setCollege] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/signup");
    }
    axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/college/get_college/${localStorage.getItem("token")}`
      )
      .then((res) => {
        setCollege(res.data.college);
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="about">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="ab-header">
        <Row>
          <Col>
            <img
              src={about_head_img}
              alt="upload header"
              className="ab-head-img"
            />
          </Col>
          <Col className="ab-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                Get to know about the DataPlace and how it works. About our team
                and how we work.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="ab-body">
        <Row className="ab-row">
          <div className="ab-heading">What is DataPlace?</div>
          <div className="ab-text">
            DataPlace is a platform for the college to upload their data and
            manage it. The data is stored in a secure manner and can be accessed
            by the college only. The data can be used for various purposes like
            research, analysis, etc. various levels of analysis are provided to
            the college to get the detailed information about the data. And the
            results can be used for various purposes. We are working on
            integrating the data with the college website so that the students
            can access the data easily. We are also working on adding more
            features to the platform like downloading the data in various
            formats like excel, pdf, etc. Also we are working on adding more
            analysis and options to download the generated results.
          </div>
        </Row>

        <Row className="ab-row">
          <div className="ab-heading">How does it work?</div>
          <div className="ab-text">
            The college can upload the data in the form provided by us. The data
            is then stored in a secure manner and can be accessed by the college
            only. The data can be used for various purposes like research,
            analysis, etc. various levels of analysis are provided to the
            college to get the detailed information about the data. And the
            results can be used for various purposes. The algorithm used for
            analysis is based on machine learning and artificial intelligence.
            The data is analysed and the results are generated. The results are
            then displayed to the college. The college can download the results
            in various formats like excel, pdf, etc. We are working on
            integrating the data with with a centeral database so that the data
            can be used by various colleges and research centers.
          </div>
        </Row>

        <Row className="ab-row">
          <div className="ab-heading">About the team</div>
          <div className="ab-text">
            We are a team of 2 students from the JMIT Radaur. We are working on
            this project as a part of our college project. We are working on
            adding more features to the platform like downloading the data in
            various formats like excel, pdf, etc. Also we are working on adding
            more analysis and options to download the generated results. In case
            of any queries or suggestions please contact us at <br />
            <a href="mailto:aadityasinghal1978@gmail.com">
              <HiMail /> Aaditya Singhal
            </a>
            <br />
            <a href="mailto:amansaini19064@gmail.com">
              <HiMail /> Amandeep Singh
            </a>
            <br />
            <br />
            Our GitHub / Linkedin profile links are given below:
            <br />
            <Row>
              <Col md={3}>
                <a
                  href="https://github.com/Aaditya1978"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub /> Aaditya Singhal
                </a>
                <br />
                <a
                  href="https://github.com/amandeep-singh-12"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsGithub /> Amandeep Singh
                </a>
              </Col>
              <Col md={3}>
                <a
                  href="https://www.linkedin.com/in/aaditya-singhal-a46720192/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsLinkedin /> Aaditya Singhal
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/amandeep-singh-585a18197/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsLinkedin /> Amandeep Singh
                </a>
              </Col>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
}
