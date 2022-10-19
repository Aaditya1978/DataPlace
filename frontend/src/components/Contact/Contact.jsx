import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { FaQuestionCircle } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
import NavBar from "../NavBar/NavBar";
import contact_head_image from "../../images/contact_1.png";
import "./Contact.scss";

export default function Contact() {
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

  const [quries, setQuries] = useState([]);

  const [question, setQuestion] = useState({
    name: "",
    query: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
            `${process.env.REACT_APP_BASE_URL}/api/contact/get_all/${res.data.college.id}`
          )
          .then((result) => {
            setQuries(result.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleQuestion = (e) => {
    e.preventDefault();
    if (question.name === "" || question.query === "") {
      alert("Please fill all the fields.");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/contact/create`, {
        name: question.name,
        email: college.email,
        query: question.query,
        college_id: college.id,
      })
      .then((res) => {
        alert(res.data.message);
        const newQuries = [...quries];
        newQuries.push(res.data.data);
        setQuries(newQuries);
        handleCloseModal();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleRefresh = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/contact/get_all/${college.id}`)
      .then((result) => {
        setQuries(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contact">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="c-header">
        <Row>
          <Col>
            <img
              src={contact_head_image}
              alt="upload header"
              className="c-head-img"
            />
          </Col>
          <Col className="c-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                We are here to help you. <br />
                Please contact us for any queries, we will get back to you soon.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="c-body">
        {/* ask query button */}
        <Row className="c-btn-row">
          <Button
            className="c-btn"
            variant="outline-success"
            onClick={handleShowModal}
          >
            Ask Query <FaQuestionCircle />
          </Button>

          <Button className="c-btn" variant="outline-success" onClick={handleRefresh}>
            Refresh <TbRefresh />
          </Button>
        </Row>

        {/* main div for queries */}
        <div className="c-query">
          <div className="c-query-head">Your Queries</div>
          <div className="c-query-body">
            {quries.length === 0 ? (
              <div className="c-query-empty">No queries yet.</div>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Query</th>
                    <th>Response</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Response Time</th>
                  </tr>
                </thead>
                <tbody>
                  {quries.map((query, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{query.query}</td>
                      <td>
                        {query.response === null ? (
                          <>No response yet</>
                        ) : (
                          <>{query.response}</>
                        )}
                      </td>
                      <td>{query.status}</td>
                      <td>{new Date(query.date).toLocaleString()}</td>
                      <td>
                        {query.response_date === null ? (
                          <>No response yet</>
                        ) : (
                          <>{new Date(query.response_date).toLocaleString()}</>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>

        {/* modal for quries */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          style={{ background: "none" }}
          className="c-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ask Query</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ color: "black" }}>
            <Form className="c-form" onSubmit={handleQuestion} method="POST">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={question.name}
                  onChange={(e) =>
                    setQuestion({ ...question, name: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Query</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your query"
                  value={question.query}
                  onChange={(e) =>
                    setQuestion({ ...question, query: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button
                className="c-form-button"
                variant="outline-primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-warning" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
