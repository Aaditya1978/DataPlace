import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
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
    </div>
  );
}
