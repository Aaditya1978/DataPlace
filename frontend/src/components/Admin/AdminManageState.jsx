import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import AdminNav from "./AdminNav";
import AdminNoDataImg from "../../images/admin_no_data.png";
import AdminMamangeStateIMG from "../../images/manage_state.png";
import "./AdminManageState.scss";

export default function AdminManageState() {
  const navigate = useNavigate();

  const state = useParams().state;

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });
  const [collegeData, setCollegeData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [blockCollegeId, setBlockCollegeId] = useState("");
  const [blockCollegeEmail, setBlockCollegeEmail] = useState("");

  const handleModalShow = (college_id, college_email) => {
    setBlockCollegeId(college_id);
    setBlockCollegeEmail(college_email);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setBlockCollegeEmail("");
    setBlockCollegeId("");
    setModalShow(false);
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
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/admin/get_data_by_state/${state}`
          )
          .then((res) => {
            setCollegeData(res.data.data);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("admin_token");
        navigate("/dataplace_admin/login");
      });
  }, [navigate, state]);

  const handleDownload = (college_id, college_name) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/admin/get_excel_data/${college_id}`,
        {
          responseType: "blob",
        },
      )
      .then(async (res) => {
        const blob = await new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `${college_name}_placement_data.xlsx`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBlock = () => {
    if(blockReason === "") {
      alert("Please enter the reason for blocking the college.");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/admin/block_college`,
        {
          college_id: blockCollegeId,
          email: blockCollegeEmail,
          block_reason: blockReason,
        }
      )
      .then((res) => {
        alert(res.data.message);
        const index = collegeData.findIndex(
          (college) => college.id === blockCollegeId
        );
        const temp = [...collegeData];
        temp[index].isBlocked = true;
        setCollegeData(temp);
        setBlockCollegeEmail("");
        setBlockCollegeId("");
        setBlockReason("");
        setModalShow(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleUnblock = (college_id, college_email) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/admin/unblock_college`,
        {
          college_id: college_id,
          email: college_email,
        }
      )
      .then((res) => {
        alert(res.data.message);
        const index = collegeData.findIndex(
          (college) => college.id === college_id
        );
        const temp = [...collegeData];
        temp[index].isBlocked = false;
        setCollegeData(temp);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };


  return (
    <div className="adminmanagestate">
      {/* Admin NavBar */}
      <AdminNav />

      <Container>
        {collegeData.length === 0 ? (
          <div className="no-data">
            <img src={AdminNoDataImg} alt="No Data" className="no-data-img" />
            <div className="no-data-text">
              Currently no colleges in {state} exist in our database.
            </div>
          </div>
        ) : (
          <div className="ams-main">
            <Row className="ams-head">
              <Col md={6} className="ams-head-text">
                Manage Colleges in {state}
                <span className="ams-head-text-sub">
                  Here you can manage the colleges in {state} and their
                  information.
                </span>
              </Col>
              <Col md={6}>
                <img
                  src={AdminMamangeStateIMG}
                  alt="Manage State"
                  className="ams-head-img"
                />
              </Col>
            </Row>
            <div className="ams-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>College Name</th>
                    <th>College Email</th>
                    <th>College Phone</th>
                    <th>College Address</th>
                    <th>College District</th>
                    <th>College State</th>
                    <th>College Pincode</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collegeData.map((college, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{college.name}</td>
                      <td>{college.email}</td>
                      <td>{college.phone}</td>
                      <td>{college.address}</td>
                      <td>{college.district}</td>
                      <td>{college.state}</td>
                      <td>{college.pincode}</td>
                      <td width={"100%"}>
                        <Row>
                          <Col md={12}>
                            <Button
                              variant="outline-primary"
                              className="ams-body-btn"
                              onClick={() =>
                                navigate(`/dataplace_admin/manage/${state}/${college.id}`)
                              }
                            >
                              View Placement Data
                            </Button>
                          </Col>
                          <Col md={12}>
                            <Button
                              variant="outline-primary"
                              className="ams-body-btn"
                              onClick={ () => handleDownload(college.id, college.name) }
                            >
                              Download Placement Data
                            </Button>
                          </Col>
                          <Col md={12}>
                            { !college.isBlocked ? (
                              <Button
                                variant="outline-primary"
                                className="ams-body-btn danger"
                                onClick={() =>
                                  handleModalShow(college.id, college.email)
                                }
                              >
                                Block College
                              </Button>
                            ) : (
                              <Button
                                variant="outline-primary"
                                className="ams-body-btn success"
                                onClick={() =>
                                  handleUnblock(college.id, college.email)
                                }
                              >
                                Unblock College
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Container>

      {/* Modal */}
      <Modal className="ams-modal" show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reason for Bloacking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="block-button" onClick={handleBlock}>
            Block
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
