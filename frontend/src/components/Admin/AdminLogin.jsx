import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container,Row, Col, Card, Form, Button } from "react-bootstrap";
import { MdEmail, MdPassword } from "react-icons/md";
import axios from "axios";
import AdminLoginImage from "../../images/admin_login.png";
import "./AdminLogin.scss";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/admin/login`, admin)
      .then((res) => {
        localStorage.setItem("admin_token", res.data.token);
        navigate("/dataplace_admin/dashboard");
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <Container className="adminlogin">
      <Row>
        <Col md={9} className="adminlogin-left">
          <Card className="al-card">
            <Card.Body>
              <div className="al-card-head">Admin Login</div>
              <Form onSubmit={handleAdminLogin} method="POST">
                <Row classname="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>
                      <MdEmail /> Enter Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      value={admin.email}
                      onChange={(e) => {
                        setAdmin({ ...admin, email: e.target.value });
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>
                      <MdPassword /> Enter Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      value={admin.password}
                      onChange={(e) => {
                        setAdmin({ ...admin, password: e.target.value });
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid password.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className="error-message">
                  {error && <p>{errorMessage}</p>}
                </div>
                <Row className="al-b-row">
                  <Button type="submit" className="al-submit-button">
                    Submit
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="adminlogin-right">
          <img src={AdminLoginImage} alt="admin login" className="al-img" />
        </Col>
      </Row>
    </Container>
  );
}
