import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import AdminNav from "./AdminNav";
import "./AdminDash.scss";
import TableauReport from "tableau-react";

export default function AdminDash() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });

  const options = {
    height: "65rem",
    width: "100%",
    hideTabs: false,
  };

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

      <Container className="dash-u">
        Hello {admin.name}
      </Container>

      <div className="tableau-u">
        <TableauReport
          url="https://public.tableau.com/views/DataPlace1/HomeDashboard"
          options={options}
        />
      </div>

    </div>
  );
}
