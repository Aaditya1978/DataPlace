import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { TbRefresh } from "react-icons/tb";
import AdminNav from "./AdminNav";
import AdminQueryImg from "../../images/admin_query.png";
import "./AdminQuery.scss";

export default function AdminQuery() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });
  const [queries, setQueries] = useState([]);
  const [response, setResponse] = useState({
    admin_id: "",
    response: "",
  });
  const [contact_id, setContact_id] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setContact_id("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (localStorage.getItem("admin_token") === null) {
      navigate("/dataplace_admin/login");
    }
    axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/admin/get_admin/${localStorage.getItem("admin_token")}`
      )
      .then((res) => {
        setAdmin(res.data.admin);
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/admin/get_contact`)
          .then((res) => {
            setQueries(res.data.data);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("admin_token");
        navigate("/dataplace_admin/login");
      });
  }, [navigate]);

  const handleResponse = (e) => {
    e.preventDefault();
    setResponse({ ...response, admin_id: admin.id });
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/contact_response`, {
        response: response.response,
        admin_id: response.admin_id,
        contact_id: contact_id,
      })
      .then((res) => {
        alert(res.data.message);
        handleClose();
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/admin/get_contact`)
          .then((res) => {
            setQueries(res.data.data);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleRefresh = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/admin/get_contact`)
      .then((res) => {
        setQueries(res.data.data);
      });
  };

  return (
    <div className="adminquery">
      {/* Admin NavBar */}
      <AdminNav />

      {/* header section */}
      <Container className="aq-header">
        <Row>
          <Col>
            <img
              src={AdminQueryImg}
              alt="upload header"
              className="aq-head-img"
            />
          </Col>
          <Col className="aq-head-text">
            <div>
              Welcome {admin.name} <br />
              <span>
                Here you can view all the queries that have been sent by the
                colleges and also reply to them.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* query reply modal */}
      <Modal
        show={show}
        onHide={handleClose}
        style={{ background: "none" }}
        className="aq-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply Query</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <Form className="aq-form" onSubmit={handleResponse} method="POST">
            <Form.Group>
              <Form.Label>Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Response"
                value={response.response}
                onChange={(e) =>
                  setResponse({ ...response, response: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button
              className="aq-form-button"
              variant="outline-primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* main body */}
      <Container className="aq-body">
        <Row>
          <div className="aq-body-text">Queries</div>
        </Row>
        
        <Row className="aq-btn-row">
          <Button className="aq-btn" variant="outline-success" onClick={handleRefresh}>
            Refresh <TbRefresh />
          </Button>
        </Row>

        <div className="aq-body-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Query</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{query.name}</td>
                  <td>{query.email}</td>
                  <td>{query.query}</td>
                  <td>{new Date(query.date).toLocaleString()}</td>
                  <td>
                    <button
                      className="aq-reply-btn"
                      onClick={() => {
                        setContact_id(query.id);
                        handleShow();
                      }}
                    >
                      Reply
                    </button>
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
