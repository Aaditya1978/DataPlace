import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, FloatingLabel, InputGroup, Button, Card, Pagination } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import NavBar from "../NavBar/NavBar";
import "./Job.scss";
import job_header_image from "../../images/job_1.png";

export default function Job() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [college, setCollege] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [jobData, setJobData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const jobsPerPage = 12;


  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/job/get_jobs/${searchQuery}`)
        .then((res) => {
            setJobData(res.data.jobData);
            setLoading(false);
            setTotalPages(Math.ceil(res.data.jobData.length / jobsPerPage));
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
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
        if(res.data.college.isBlocked){
          alert("Your account has been blocked by the admin. You cannot access this feature. Please contact admin for more details.");
          navigate("/profile");
        }
        axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/job/get_jobs/all`)
        .then((res) => {
            setJobData(res.data.jobData);
            setLoading(false);
            setTotalPages(Math.ceil(res.data.jobData.length / jobsPerPage));
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);
    


  return loading ? (
    <div className="spinner">
      <InfinitySpin color="#0087ca" />
    </div>
  ) : (
    <div className="job">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="j-header">
        <Row>
          <Col>
            <img
              src={job_header_image}
              alt="Job header"
              className="j-head-img"
            />
          </Col>
          <Col className="j-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                Here you can find the latest jobs for your college students.<br />
                Hope you find it useful.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* body section */}
      <Container className="j-body">

        {/* search bar */}
        <div className="j-search">
            <InputGroup className="mb-3 input-g">
                <FloatingLabel label="Search for jobs">
                    <Form.Control 
                        type="text" 
                        placeholder="Search for jobs" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </FloatingLabel>
                <Button onClick={(e) => handleSearch(e)}> <FaSearch /> Search</Button>
            </InputGroup>
        </div>

        {/* job list */}
        <Container className="j-list" fluid>
            { jobData.length !== 0 ? (
            <Row>
                {jobData.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map((data, i) => (
                <Col md={4} sm={6} xs={12} key={i}>
                    <Card className="j-card">
                        <Card.Body>
                            <Card.Title className="jc-head">{data["job-title"]}</Card.Title>
                            <Card.Subtitle className="mb-2 jc-subhead">{data["company-name"]}</Card.Subtitle>
                            <Card.Text className="jc-text">
                                <span>Salary: </span> {data["job-salary"]} <br/>
                                <span>Posted On</span> {data["post-date"]}
                            </Card.Text>
                            <Button className="jc-button" href={data["job-link"]} target="_blank">Apply</Button>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
            ) : (
                <div className="j-no-data">
                    Sorry, no jobs available currently.
                    <br /> Please try again later.
                </div>
            )}

            {/* pagination */}
            <Container className="j-pagination-container">
                <Pagination className="j-pagination">
                    {Array.from(Array(totalPages), (e, i) => {
                        return (
                            <Pagination.Item
                                key={i} 
                                active={i + 1 === currentPage} 
                                onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </Pagination.Item>
                        );
                    })}
                </Pagination>
            </Container>

        </Container>

      </Container>

    </div>
  );
}
