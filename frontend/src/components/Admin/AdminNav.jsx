import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BiLogOutCircle } from "react-icons/bi";
import "./AdminNav.scss";
import logo from "../../images/logo.png";

export default function AdminNav() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/dataplace_admin/login");
  };

  return (
    <div className="adnav-bar">
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/dataplace_admin/dashboard" className="adnav-logo">
            <img
              src={logo}
              width="40"
              className="d-inline-block"
              alt="DataPlace logo"
            />{" "}
            DataPlace
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="adnav-nav" />
          <Navbar.Collapse id="adnav-nav">
            <Nav className="ad-nav me-auto">
              <NavLink
                to="/dataplace_admin/dashboard"
                className= {({ isActive }) => isActive ? "active adnav-nav-link": 'adnav-nav-link'}
              >
                Home
              </NavLink>
              <NavLink
                to="/dataplace_admin/manage"
                className= {({ isActive }) => isActive ? "active adnav-nav-link": 'adnav-nav-link'}
              >
                Manage
              </NavLink>
              <NavLink
                to="/dataplace_admin/query"
                className= {({ isActive }) => isActive ? "active adnav-nav-link": 'adnav-nav-link'}
              >
                Queries
              </NavLink>
            </Nav>
            <div className="d-flex adnav-side-sec" onClick={handleLogout}>
              <BiLogOutCircle className="adnav-log-icon" /> <span>Logout</span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
