import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import FeedbackImg from "../../images/feedback.png";
import { InfinitySpin } from "react-loader-spinner";
import "./FeedbackData.scss";

export default function FeedbackData() {
  const navigate = useNavigate();
  const formId = useParams().formId;

  const [loading, setLoading] = useState(true);
  const [college, setCollege] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [feedbackForm, setFeedbackForm] = useState();
  const [feedbacks, setFeedbacks] = useState([]);

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
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/feedback/get_feedbacks/${formId}`
          )
          .then((res3) => {
            setFeedbacks(res3.data.data);
            setFeedbackForm(res3.data.form);
            setLoading(false);
          })
          .catch((err) => {
            alert(err.response.data.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [formId, navigate]);

 
 
  return loading ? (
    <div className="spinner">
      <InfinitySpin color="#0087ca" />
    </div>
  ) : (
    <div className="feedbackdata">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="fd-header">
        <Row>
          <Col>
            <img
              src={FeedbackImg}
              alt="feedback header"
              className="fd-head-img"
            />
          </Col>
          <Col className="fd-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                You can view the feedbacks of your college here for the year{" "}
                {feedbackForm.year}
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="fd-body">

        <div className="fd-table">
          <h1>Feedback Data Table</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Branch</th>
                <th>Email</th>
                <th>Already Placed</th>
                <th>Company Name</th>
                <th>Overall Experience</th>
                <th>Feedback</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
                {feedbacks.map((feedback, index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{feedback.name}</td>
                        <td>{feedback.rollNumber}</td>
                        <td>{feedback.branch}</td>
                        <td>{feedback.email}</td>
                        <td>
                            {feedback.alreadyPlaced ? "Yes" : "No"}
                        </td>
                        <td>{feedback.companyName}</td>
                        <td>{feedback.overallExperience}</td>
                        <td>{feedback.feedback}</td>
                        <td>
                            {new Date(feedback.createdAt).toLocaleString()}
                        </td>
                    </tr>
                ))}
            </tbody>
            
          </Table>
        </div>
      </Container>
    </div>
  );
}