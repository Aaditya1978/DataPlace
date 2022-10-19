import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import AdminNav from "./AdminNav";
import "./AdminDash.scss";

export default function AdminDash() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });

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
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("admin_token");
        navigate("/dataplace_admin/login");
      });
  }, [navigate]);

  return (
    <div className="admindash">
      {/* Admin NavBar */}
      <AdminNav />

      <Container>
        Hello {admin.name}
        hello
      </Container>
    </div>
  );
}
