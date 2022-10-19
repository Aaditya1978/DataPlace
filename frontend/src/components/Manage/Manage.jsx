import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import { AiTwotoneDelete, AiOutlineCloudDownload } from "react-icons/ai";
import NavBar from "../NavBar/NavBar";
import manage_head_image from "../../images/manage_1.png";
import "./Manage.scss";

export default function Manage() {
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

  const [placement, setPlacement] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

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
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/api/placement/get_data/${res.data.college.id}`
          )
          .then((res) => {
            setPlacement(res.data.placement);
            setYearList(res.data.yearList);
            setBranchList(res.data.branchList);
            setSelectedYear(res.data.yearList[0]);
            setSelectedBranch("ALL");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  const handleDelete = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/placement/delete_data/${college.id}/${id}`
      )
      .then((res) => {
        setPlacement(res.data.placement);
        setYearList(res.data.yearList);
        setBranchList(res.data.branchList);
        setSelectedYear(res.data.yearList[0]);
        setSelectedBranch("ALL");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDownload = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/placement/get_excel_data/${college.id}`,
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
        link.download = `${college.name}_placement_data.xlsx`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="manage">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="m-header">
        <Row>
          <Col>
            <img
              src={manage_head_image}
              alt="upload header"
              className="m-head-img"
            />
          </Col>
          <Col className="m-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                Manage your college placement records, students details and
                other information.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="m-body">
        {/* placement record section */}
        <div className="m-placement">
          <div className="m-title">Placement Records</div>
          <div className="m-subtitle">Manage your placement records</div>

          <Row className="m-down-row">
            <Button
              variant="outline-primary"
              className="m-down-btn"
              onClick={handleDownload}
            >
              <AiOutlineCloudDownload /> Download Data as CSV
            </Button>
          </Row>

          <div className="m-table">
            <div className="m-table-selects">
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {placement.length > 0 &&
                  placement
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
                        <td>
                          <AiTwotoneDelete
                            className="m-delete-icon"
                            onClick={() => handleDelete(item.id)}
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
}
