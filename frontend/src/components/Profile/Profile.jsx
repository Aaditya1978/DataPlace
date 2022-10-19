import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { FaUser, FaPhone, FaHouseUser } from "react-icons/fa";
import { MdOutlineLocationCity } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { BsFillPinMapFill } from "react-icons/bs";
import NavBar from "../NavBar/NavBar";
import ProfileHeadImg from "../../images/profile_1.png";
import "./Profile.scss";

export default function Profile() {
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
  const [edit, setEdit] = useState("");
  const [oldValue, setOldValue] = useState("");

  const handleEdit = (e) => {
    setEdit(e.target.name);
    setOldValue(e.target.value);
  };

  const handleSave = (e) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/college/update_college`, {
        college_id: college.id,
        name: college.name,
        phone: college.phone,
        address: college.address,
        district: college.district,
        state: college.state,
        pincode: college.pincode,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
    setEdit("");
  };

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
    <div className="profile">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="p-header">
        <Row>
          <Col>
            <img
              src={ProfileHeadImg}
              alt="profile header"
              className="p-head-img"
            />
          </Col>
          <Col className="p-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                Here you can manage your profile and edit your details.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="p-body">
        <Row>
          <Col>
            <div className="p-body-head">Profile</div>
            <div className="p-details">
              <Row>
                <Col md={4}>
                  <div className="p-details-head">
                    <FaUser /> Name
                  </div>
                  <div className="p-details-box">
                    {edit === "name" ? (
                      <>
                        <input
                          type="text"
                          className="p-details-input"
                          name="name"
                          value={college.name}
                          onChange={(e) =>
                            setCollege({ ...college, name: e.target.value })
                          }
                        />
                        <Button
                          variant="primary"
                          className="p-details-btn"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          className="p-details-btn"
                          name=""
                          onClick={(e) => {
                            setCollege({ ...college, name: oldValue });
                            setEdit("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-details-text">{college.name}</div>
                        <Button
                          variant="outline-primary"
                          className="p-details-btn"
                          name="name"
                          value={college.name}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-details-head">
                    <FaPhone /> Phone No.
                  </div>
                  <div className="p-details-box">
                    {edit === "phone" ? (
                      <>
                        <input
                          type="number"
                          className="p-details-input"
                          name="phone"
                          value={college.phone}
                          onChange={(e) =>
                            setCollege({ ...college, phone: e.target.value })
                          }
                        />
                        <Button
                          variant="primary"
                          className="p-details-btn"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          className="p-details-btn"
                          name=""
                          onClick={(e) => {
                            setCollege({ ...college, phone: oldValue });
                            setEdit("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-details-text">{college.phone}</div>
                        <Button
                          variant="outline-primary"
                          className="p-details-btn"
                          name="phone"
                          value={college.phone}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-details-head">
                    <FaHouseUser /> Address
                  </div>
                  <div className="p-details-box">
                    {edit === "address" ? (
                      <>
                        <input
                          type="text"
                          className="p-details-input"
                          name="address"
                          value={college.address}
                          onChange={(e) =>
                            setCollege({ ...college, address: e.target.value })
                          }
                        />
                        <Button
                          variant="primary"
                          className="p-details-btn"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          className="p-details-btn"
                          name=""
                          onClick={(e) => {
                            setCollege({ ...college, address: oldValue });
                            setEdit("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-details-text">{college.address}</div>
                        <Button
                          variant="outline-primary"
                          className="p-details-btn"
                          name="address"
                          value={college.address}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col md={4}>
                  <div className="p-details-head">
                    <MdOutlineLocationCity /> District
                  </div>
                  <div className="p-details-box">
                    {edit === "district" ? (
                      <>
                        <input
                          type="text"
                          className="p-details-input"
                          name="district"
                          value={college.district}
                          onChange={(e) =>
                            setCollege({ ...college, district: e.target.value })
                          }
                        />
                        <Button
                          variant="primary"
                          className="p-details-btn"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          className="p-details-btn"
                          name=""
                          onClick={(e) => {
                            setCollege({ ...college, district: oldValue });
                            setEdit("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-details-text">{college.district}</div>
                        <Button
                          variant="outline-primary"
                          className="p-details-btn"
                          name="district"
                          value={college.district}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-details-head">
                    <GiWorld /> State
                  </div>
                  <div className="p-details-box">
                    {edit === "state" ? (
                      <>
                        <input
                          type="text"
                          className="p-details-input"
                          name="state"
                          value={college.state}
                          onChange={(e) =>
                            setCollege({ ...college, state: e.target.value })
                          }
                        />
                        <Button
                          variant="primary"
                          className="p-details-btn"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          className="p-details-btn"
                          name=""
                          onClick={(e) => {
                            setCollege({ ...college, state: oldValue });
                            setEdit("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-details-text">{college.state}</div>
                        <Button
                          variant="outline-primary"
                          className="p-details-btn"
                          name="state"
                          value={college.state}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="p-details-head">
                    <BsFillPinMapFill /> Pincode
                  </div>
                  <div className="p-details-box">
                    {edit === "pincode" ? (
                      <>
                        <input
                          type="text"
                          className="p-details-input"
                          name="pincode"
                          value={college.pincode}
                          onChange={(e) =>
                            setCollege({ ...college, pincode: e.target.value })
                          }
                        />
                        <Button
                          variant="primary"
                          className="p-details-btn"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          className="p-details-btn"
                          name=""
                          onClick={(e) => {
                            setCollege({ ...college, pincode: oldValue });
                            setEdit("");
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="p-details-text">{college.pincode}</div>
                        <Button
                          variant="outline-primary"
                          className="p-details-btn"
                          name="pincode"
                          value={college.pincode}
                          onClick={handleEdit}
                        >
                          Edit
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
