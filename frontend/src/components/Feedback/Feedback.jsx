import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Form, Table } from "react-bootstrap";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import FeedbackImg from "../../images/feedback.png";
import { InfinitySpin } from "react-loader-spinner";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "./Feedback.scss";

export default function Feedback() {
  const navigate = useNavigate();

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
  const [formYear, setFormYear] = useState("");
  const [feedbackForms, setFeedbackForms] = useState([]);

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
            `${process.env.REACT_APP_BASE_URL}/api/feedback/get_feedback_forms/${res.data.college.email}`
          )
          .then((res3) => {
            setFeedbackForms(res3.data.data);
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
  }, [navigate]);

  const handleFormGenerate = (e) => {
    e.preventDefault();
    if (formYear < 1900) {
      alert("Enter valid year");
      return;
    }
    if (formYear > new Date().getFullYear() + 2) {
      alert("Enter valid year");
      return;
    }
    if (formYear === "") {
      alert("Enter valid year");
      return;
    }

    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/feedback/create_feedback_form`,
        {
          email: college.email,
          year: formYear,
          collegeName: college.name,
        }
      )
      .then((res) => {
        alert("Feedback form created successfully");
        setFormYear("");
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/feedback/get_feedback_forms/${college.email}`
          )
          .then((res2) => {
            setFeedbackForms(res2.data.data);
            setLoading(false);
          })
          .catch((err) => {
            alert(err.response.data.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/feedback/delete_feedback_form/${id}`
      )
      .then((res) => {
        alert("Feedback form deleted successfully");
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/feedback/get_feedback_forms/${college.email}`
          )
          .then((res2) => {
            setFeedbackForms(res2.data.data);
            setLoading(false);
          })
          .catch((err) => {
            alert(err.response.data.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        setLoading(false);
      });
  };

  return loading ? (
    <div className="spinner">
      <InfinitySpin color="#0087ca" />
    </div>
  ) : (
    <div className="feedback">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="f-header">
        <Row>
          <Col>
            <img
              src={FeedbackImg}
              alt="feedback header"
              className="f-head-img"
            />
          </Col>
          <Col className="f-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                Get in touch with your students and alumni to get feedback
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="f-body">
        <Row className="f-row">
          <Form.Control
            type="number"
            placeholder="Enter Year"
            className="f-input"
            value={formYear}
            onChange={(e) => setFormYear(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="outline-success"
            className="f-btn"
            onClick={handleFormGenerate}
          >
            Generate form
          </Button>
        </Row>

        <div className="f-table">
          <h1>Feedback Table</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Feedback Link</th>
                <th>Created At</th>
                <th>Actions</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {feedbackForms.length &&
                feedbackForms.map((form) => {
                  return (
                    <tr>
                      <td>{form.year}</td>
                      <td>{form.link}</td>
                      <td>{new Date(form.createdAt).toLocaleString()}</td>
                      <td className="b-row">
                        <Button
                          variant="outline-success"
                          // open form.link in new tab
                          onClick={() => {
                            window.open(form.link, "_blank");
                          }}
                        >
                          View Form
                        </Button>
                        <Button
                          variant="outline-success"
                          onClick={() => {
                            navigate(`/feedback_data/${form.id}`);
                          }}
                        >
                          View Feedbacks
                        </Button>
                        <Button
                          variant="outline-danger dang"
                          onClick={() => handleDelete(form.id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <CopyToClipboard text={form.link}>
                          <Button variant="outline-success">Copy</Button>
                        </CopyToClipboard>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
