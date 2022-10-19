import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Form } from "react-bootstrap";
import axios from "axios";
import AdminNav from "./AdminNav";
import AdminMamangeStateIMG from "../../images/manage_state.png";
import "./AdminManagePlacement.scss";

export default function AdminManagePlacement() {
  const navigate = useNavigate();

  const state = useParams().state;
  const college = useParams().college;

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });

  const [collegeData, setCollegeData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [placementData, setPlacementData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

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
            `${process.env.REACT_APP_BASE_URL}/api/admin/get_data_by_college/${college}`
          )
          .then((res) => {
            setCollegeData(res.data.college);
            setPlacementData(res.data.placements);
            setYearList(res.data.yearList);
            setBranchList(res.data.branchList);
            setSelectedYear(res.data.yearList[0]);
            setSelectedBranch("ALL");
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("admin_token");
        navigate("/dataplace_admin/login");
      });
  }, [navigate, college]);

  return (
    <div className="adminmanageplacement">
      {/* Admin NavBar */}
      <AdminNav />

      <Container>
        <div className="amp-main">
          <Row className="amp-head">
            <Col md={6} className="amp-head-text">
              Placement Records of {collegeData.name}
              <span className="amp-head-text-sub">
                Manage Placement Records of {collegeData.name} situated in{" "}
                {state}
              </span>
            </Col>
            <Col md={6}>
              <img
                src={AdminMamangeStateIMG}
                alt="Manage State"
                className="amp-head-img"
              />
            </Col>
          </Row>
          <div className="amp-body">
            <div className="amp-table">
              <div className="amp-table-selects">
                <Row>
                  <Col md={4}>
                    <Form.Label>Select Year</Form.Label>
                    <Form.Select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {yearList.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Label>Select Branch</Form.Label>
                    <Form.Select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                      <option value="ALL">ALL</option>
                      {branchList.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Branch</th>
                    <th>Total Students</th>
                    <th>Eligible Students</th>
                    <th>PNR Students</th>
                    <th>Placed Students</th>
                    <th>Offer Letters</th>
                    <th>Lowest Package</th>
                    <th>Highest Package</th>
                    <th>Average Package</th>
                    <th>No. of Companies</th>
                  </tr>
                </thead>
                <tbody>
                  {placementData.length > 0 &&
                    placementData
                      .filter((item) => {
                        if (selectedBranch == "ALL") {
                          return item.year == selectedYear;
                        } else {
                          return (
                            item.year == selectedYear &&
                            item.branch == selectedBranch
                          );
                        }
                      })
                      .map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.year}</td>
                          <td>{item.branch}</td>
                          <td>{item.total_students}</td>
                          <td>{item.eligible_students}</td>
                          <td>{item.pnr_students}</td>
                          <td>{item.placed_students}</td>
                          <td>{item.offer_letters}</td>
                          <td>{item.lowest_package}</td>
                          <td>{item.highest_package}</td>
                          <td>{item.average_package}</td>
                          <td>{item.number_of_companies}</td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
