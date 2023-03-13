import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import "./NavBar.scss";
import logo from "../../images/logo.png";

export default function NavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="nav-bar">
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard" className="nav-logo">
            <img
              src={logo}
              width="40"
              className="d-inline-block"
              alt="DataPlace logo"
            />{" "}
            DataPlace
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="d-nav me-auto">
              <NavLink
                to="/dashboard"
                className= {({ isActive }) => isActive ? "active d-nav-link": 'd-nav-link'}
              >
                Home
              </NavLink>
              <NavLink
                to="/upload"
                className= {({ isActive }) => isActive ? "active d-nav-link": 'd-nav-link'}
              >
                Upload
              </NavLink>
              <NavLink
                to="/manage"
                className= {({ isActive }) => isActive ? "active d-nav-link": 'd-nav-link'}
              >
                Manage
              </NavLink>
              <NavLink
                to="/job"
                className= {({ isActive }) => isActive ? "active d-nav-link": 'd-nav-link'}
              >
                Jobs
              </NavLink>
              <NavLink
                to="/contact"
                className= {({ isActive }) => isActive ? "active d-nav-link": 'd-nav-link'}
              >
                Contact
              </NavLink>
              <NavLink
                to="/about"
                className= {({ isActive }) => isActive ? "active d-nav-link": 'd-nav-link'}
              >
                About Us
              </NavLink>
            </Nav>
            <div className="d-flex n-side-sec" onClick={() => navigate("/profile")}>
              <FaUserAlt className="n-user-icon" /> <span>Profile</span>
            </div>
            <div className="d-flex n-side-sec-2" onClick={handleLogout}>
              <BiLogOutCircle className="n-log-icon" /> <span>Logout</span>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
